# Library Management System

  This is a library management api backend for the management of users and the books


# Routes and the Endpoints

## /Users

GET: Get all the list of users in the system
POST: Create/Register a new user


## /Users{id}

GET: Get a user by their ID
PUT: Updating a server by their ID
DELETE: Deleting a user by their ID (Check if the user still has an issued book) && (is there any penalty/fine to be collected)


## /Users/Subscription-Details/{id}

GET: Get a user subsciption details by their ID
  >> Date of subscription
  >> Valid Till?
  >>  Fine if any ?


## /Books

GET: Get all the books in the system
POST: Add a new book to the system


## /Books/{id}

GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID


## /Books/Issued

GET: Get all the issued books


## /Books/Issued/WithFine

GET: Get all issued books with their fine amount


### Subscription Types
  >> Basic (3 Months)
  >> Standard (6 Months)
  >> Premium (12 Months)

  >> If a user missed the renewal date, then user should be collected with $100
  >> If a user misses his subscription, then user is expected to pay $100
  >> If a user misses both renewal and subscription, then the collected amount should be $200


## Commands:

npm init
npm i express
npm i nodemon --save-dev

npm run dev

To restore node modules and package-lock.json --> npm i/npm install