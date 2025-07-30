const express = require('express');
const {users} = require('../data/users.json');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get('/', (req, res) => {
  // Respond with the list of all users
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id', (req, res) => {
  // Extract user ID from route parameters
  const {id} = req.params;
  // Find user with matching ID
  const user = users.find((each)=> each.id === id);

  // If user not found, return 404
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }

  // Respond with user data
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 */
router.post('/', (req, res) => {
  // Destructure required fields from request body
  const {id, name, email, registeredDate, issuedBooks, issuedDate, returnDate, subscriptionType, subscriptionDate} = req.body;

  // Validate all required fields are present
  if (!id || !name || !email || !registeredDate || !issuedBooks || !issuedDate || !returnDate || !subscriptionType || !subscriptionDate) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields',
    });
  }

  // Check if user with the same ID already exists
  const userExists = users.find((each) => each.id === id);
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: `User with ID: ${id} already exists`,
    });
  }

  // Add new user to the users array
  users.push({
    id,
    name,
    email,
    registeredDate,
    issuedBooks,
    issuedDate,
    returnDate,
    subscriptionType,
    subscriptionDate,
  });

  // Respond with success message and updated users list
  res.status(201).json({
    success: true,
    message: 'User created successfully',
  });
})

/** 
 * Route: /users/:id
 * Method: PUT
 * Description: Update a user by their ID
 * Access: Public
 * Parameters: id
 */
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  // Check if user with the given ID exists
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }
  // If user exists, update their data
  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data, // Merge existing user data with new data
      };
    } 
    return each; // Return unchanged user
  })

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  // Check if user with the given ID exists
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }

  // const index = users.indexOf(user);
  // users.splice(index, 1); // Remove user from the array
  // const updatedUsers = users;
  // Filter out the user with the given ID
  // This creates a new array without the user to be deleted
  const updatedUsers = users.filter((each) => each.id !== id);
  // Respond with success message and updated users list
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: updatedUsers,
  });
});

/**
 * Route: /books/subscriptions-details/:id
 * Method: GET
 * Description: Get subscription details of a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get('/subscriptions-details/:id', (req, res) => {
  const {id} = req.params;
  // Find user with matching ID
  const user = users.find((each) => each.id === id);
  // If user not found, return 404
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found for the ID: ${id}`,
    });
  }

  const getDateinDays = (data = '') => {
    if(data){
      date = new Date(data);
    } 
    else {
      date = new Date();
    }
    let days = Math.floor((date - new Date(user.subscriptionDate)) / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (type) => {
    if (user.subscriptionType === 'Basic') {
      date = date + 90;
    } else if (user.subscriptionType === 'Standard') {
      date = date + 180;
    } else if (user.subscriptionType === 'Premium') {
      date = date + 365;
    }
    return date;
  }

  // Calculate subscription days
  let returnDate = getDateinDays(user.returnDate);
  let currentDate = getDateinDays();
  let subscriptionDate = getDateinDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionDate >= subscriptionType(user.subscriptionType);
  let subscriptionExpired= subscriptionExpiration < currentDate;

  const data = {
  ...user,
  subscriptionExpired,
  subscriptionDaysLeft: subscriptionExpired ? 0 : subscriptionExpiration - currentDate,
  daysLeftForReturn: returnDate - currentDate,
  returnDate: returnDate < currentDate ? 'Book is overdue' : returnDate,
  fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
  }
  res.status(200).json({
    success: true,
    data: data,
  });
});


// Export the router to use in the main app
module.exports = router;