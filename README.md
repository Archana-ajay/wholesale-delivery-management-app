# wholesale-delivery-management-app
This is an wholesale delivery management app using node js and mysql database
# Book API (Node.js & MySQL CRUD)

## Introduction
This is a s CRUD (Create, Read, Update, Delete) API for creating truck users,vendors,products and managing orders built with Node.js and MySQL. It allows you to perform order management.

## Features
- Create a truck driver record.
- Retrieve a list of all truck drivers.
- Retrieve details of a specific truck driver by ID.
- Update the details of an existing truck driver.
- Delete a truck driver from the database.
- Create a vendor record.
- Retrieve a list of all vendor.
- Retrieve details of a specific vendor by ID.
- Update the details of an existing vendor.
- Delete a vendor from the database.
- Create a product record.
- Retrieve a list of all product.
- Retrieve details of a specific product by ID.
- Update the details of an existing product.
- Delete a product from the database.
- User login
- order management

## Technologies Used
- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A minimal and flexible Node.js web application framework.
- MySQL: A relational database management system.
- Sequelize: An Object-Relational Mapping (ORM) library for Node.js and MySQL.

## Getting Started
1. Clone the repository: `git clone https://github.com/yourusername/book-api.git`
2. Install dependencies: `npm install`
3. Set up your MySQL database and update the configuration in `.env`.
4. Run the API: `npm start`

## API Endpoints
- `POST /api/v1/user/signup`: Signup to the app.
- `POST /api/v1/admin/login`: Login by admin.
- `POST /api/v1/user/login`: Login by user.
- `POST /api/v1/user/forgotpassword`: Forgot password for user.
- `POST /api/v1/user/checkotp`: check otp for user.
- `POST /api/v1/user/resetpassword`: reset password for user.
- `GET /api/v1/admin/getallusers`: Retrieve a list of all users  by admin.
- `GET /api/v1/admin/getuser/:id`: Retrieve details of a specific user by ID by admin.
- `POST /api/v1/admin/adduser`: Create a new user record by admin.
- `PATCH /api/v1/admin/updateuser/:id`: Update the details of an existing user by ID.
- `DELETE /api/v1/admin/deleteuser/:id`: Delete a user from the database by ID.
- `GET /api/v1/admin/getallvendors`: Retrieve a list of all vendors  by admin.
- `GET /api/v1/admin/getvendor/:id`: Retrieve details of a specific vendor by ID by admin.
- `POST /api/v1/admin/addvendor`: Create a new vendor record by admin.
- `PATCH /api/v1/admin/updatevendor/:id`: Update the details of an existing vendor by ID.
- `DELETE /api/v1/admin/deletevendor/:id`: Delete a vendor from the database by ID.
- `GET /api/v1/admin/getallproducts`: Retrieve a list of all products  by admin.
- `GET /api/v1/admin/getproduct:id`: Retrieve details of a specific product by ID by admin.
- `POST /api/v1/admin/addproduct`: Create a new product record by admin.
- `PATCH /api/v1/admin/updateproduct/:id`: Update the details of an existing product by ID.
- `DELETE /api/v1/admin/deleteproduct/:id`: Delete a product from the database by ID.
- `GET /api/v1/user/vendors`: Retrieve a list of all vendors to select a vendor  by truck driver.
- `GET /api/v1/user/products`: Retrieve a list of all products to select a product  by truck driver.
- `POST /api/v1/user/createorder`: Create a new order by user.
- `POST /api/v1/admin/createorder`: Create a new order by admin.
- `GET /api/v1/admin/getallorders`: Retrieve a list of all orders details  by admin.

## Configuration
- Database Configuration: Update the MySQL database connection details in `config/config.js`.

## Usage
- You can use tools like Postman  interact with the API endpoints.

## Acknowledgments
- Thanks to the Node.js and MySQL communities for their excellent documentation and resources.

