const express = require('express');
const {users} = require('../data/users.json');
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, getSubscriptionDetailsById } = require('../controllers/user-controller');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get('/', getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id', getUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 */
router.post('/', createUser)

/** 
 * Route: /users/:id
 * Method: PUT
 * Description: Update a user by their ID
 * Access: Public
 * Parameters: id
 */
router.put('/:id', updateUser)

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', deleteUser);

/**
 * Route: /books/subscriptions-details/:id
 * Method: GET
 * Description: Get subscription details of a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get('/subscriptions-details/:id', getSubscriptionDetailsById);


// Export the router to use in the main app
module.exports = router;