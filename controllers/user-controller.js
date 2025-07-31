const {UserModel, BookModel} = require('../models/index-model.js');

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found"
    });
  }

  res.status(200).json({
    success: true,
    data: users,
  });
}

exports.getUserById = async (req, res) => {
  const {id} = req.params;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for id: ${id}`
    })
  }

  res.status(200).json({
    success: true,
    data: user
  })
}

exports.createUser = async (req, res) => {
  // Destructure required fields from request body
  const {data} = req.body;

  // Validate all required fields are present
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the data to create a new user',
    });
  }

  await UserModel.create(data);
  const getAllUsers = await UserModel.find();

  // Respond with success message and updated users list
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: getAllUsers
  });
}

exports.updateUser = async (req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide the data to update the user"
    })
  }

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }
  // If user exists, update their data
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
}

exports.deleteUser = async (req, res) => {
  const {id} = req.params;

  const user  = await UserModel.findById(id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }

  await UserModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
}

exports.getSubscriptionDetailsById = async (req, res) => {
  const {id} = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }

// Extract the Subscription details
// Helper: convert a date string (or today if blank) to UTC day count
const getDateInDays = (data) => {
  const d = data ? new Date(data) : new Date();
  // use UTC to avoid DST issues
  const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(utc / (1000 * 60 * 60 * 24));
};

// Calculate the subscription expiration in days since epoch
const subscriptionType = (startInDays, type) => {
  const durations = { Basic: 90, Standard: 180, Premium: 365 };
  return startInDays + (durations[type] || 0);
};

// Main logic:
const returnDateDays = getDateInDays(user.returnDate);
const currentDays = getDateInDays();
const subscriptionStartDays = getDateInDays(user.subscriptionDate);
const subscriptionExpiration = subscriptionType(subscriptionStartDays, user.subscriptionType);

// Compute day differences
const daysLeftForReturn = returnDateDays - currentDays;
const subscriptionDaysLeft = subscriptionExpiration - currentDays;
const subscriptionExpired = subscriptionDaysLeft < 0;

const data = {
  ...user._doc,
  subscriptionExpired,
  subscriptionDaysLeft,
  daysLeftForReturn,
  returnDate: daysLeftForReturn < 0 ? 'Book is overdue' : user.returnDate,
  fine: daysLeftForReturn < 0 
          ? (subscriptionExpired ? 200 : 100)
          : 0
};

res.status(200).json({ success: true, data });
}