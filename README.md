# 🚗 Car Rental App

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## Introduction
The **Car Rental App** is a comprehensive solution for managing car rentals, built using the **MERN stack** (MongoDB, Express, React, Node.js). The application allows users to browse available cars, book rentals, and rate their experiences. It also provides administrators with the tools to manage car listings and view booking details.

## Features
- 🔒 **User Authentication**: Secure login and registration for users.
- 🚗 **Car Listings**: Browse available cars with detailed information.
- 🔍 **Car Search**: Search for cars based on various criteria such as location, make, model, and price.
- 📅 **Booking Management**: Book cars for specified dates and manage existing bookings.
- ⭐ **Ratings and Reviews**: Rate and review cars after the rental period.
- 🛠️ **Admin Dashboard**: Manage car listings, bookings, and user accounts.

## Technologies Used
- **Frontend**: ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white)
- **Backend**: ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
- **Authentication**: ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white)
- **Styling**: ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white) ![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white)

## Installation
### Prerequisites
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) Node.js
- ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) npm or ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) MongoDB

### Steps
1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/car-rental-app.git
    cd car-rental-app
    ```

2. **Install dependencies for both client and server:**
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the `server` directory with the following variables:
    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```sh
    cd server
    npm run dev
    cd ../client
    npm start
    ```

## Usage
- **Homepage**: Browse available cars, use the search form to filter cars based on location, make, model, etc.
- **Car Details**: View detailed information about a specific car, select rental dates, and additional options.
- **Booking**: Confirm booking details and proceed to checkout.
- **Ratings**: After a rental period, users can rate their experience.

## Screenshots
![image](https://github.com/user-attachments/assets/efcc388d-be30-4522-9ac9-a68d5ca84f36)
![image](https://github.com/user-attachments/assets/9a8d877b-769d-4044-9033-a7447223d159)

## API Endpoints
### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create a new car (Admin only)
- `PUT /api/cars/:id` - Update car details (Admin only)
- `DELETE /api/cars/:id` - Delete a car (Admin only)

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/user` - Get bookings for the logged-in user

### Ratings
- `PUT /api/cars/:id/rating` - Update car rating

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
