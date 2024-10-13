# Inter IIT Task Project

## Overview

This project is a web application designed to manage and display information about godowns and their items. It consists of a frontend built with [React](https://reactjs.org/) and a backend using [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/), with [MongoDB](https://www.mongodb.com/) as the database. The application allows users to sign up, log in, view godowns, and search for items based on various criteria.

## Deployment Links

1. **Frontend**: https://interiit-frontend.azurewebsites.net
2. **Backend**: https://interiit-backend.azurewebsites.net


## Thought Process and Implementation

### Ideas and Thought Process

1. **User Authentication**: 
   Implemented using [Supabase](https://supabase.com/) for managing user sign-up and login processes. This ensures secure access to the application.
   
2. **Godown and Item Management**: 
   The application fetches data from a MongoDB database to display a hierarchical structure of godowns and their respective items. This structure allows users to easily navigate and find specific items.
   
3. **Search and Filter**: 
   Users can search for items by name and filter them by category, enhancing the user experience by making it easier to find specific items.
   
4. **Responsive Design**: 
   The frontend is designed to be responsive, ensuring usability across different devices and screen sizes.

### Steps Taken

1. **Frontend Development**:
   - Used React for building the user interface.
   - Implemented routing with [`react-router-dom`](https://reactrouter.com/en/main) for navigation between pages.
   - Styled components using [`styled-components`](https://styled-components.com/) for a consistent and modular design.

2. **Backend Development**:
   - Set up an Express server to handle API requests.
   - Connected to a MongoDB database using [Mongoose](https://mongoosejs.com/) for data management.
   - Implemented RESTful APIs to fetch godowns and items, and to perform search operations.

3. **Dockerization**:
   - Created a `docker-compose.yml` file to containerize the frontend and backend services.
   - Configured Dockerfiles for both services to ensure consistent deployment environments.

4. **Deployment**:
   - Deployed the frontend and backend services to [Azure], providing a scalable and reliable hosting solution.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/) and npm installed on your local machine.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed for containerization.

### Running Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd InterIIT-Task
   ```
   
2. **Backend Setup**:
    Navigate to the backend directory:
   ```bash
   cd backend
   ```
   Install dependencies:

   ```bash
   npm install
   ```

   Create a .env file in the backend directory with the following content:

   ```env
   MONGO_URI=<your-mongodb-uri>
   PORT=5000
   ```

   Start the backend server:

   ```bash
    node server.js
   ```

3. **Frontend Setup**:

    Navigate to the frontend directory:

    ```bash
      cd ../frontend
    ```

   Install dependencies:

   ```bash
   npm install
   ```
   
   Start the frontend development server:

   ```bash
   npm start
   ```
4. **Access the Application**:
    Open your browser and go to http://localhost:3000.
   
### Running with Docker

1. **Build and Run Containers**:
   From the root directory of the project, run:
   Build and Run Containers:

   From the root directory of the project, run:

    ```bash
    docker-compose up --build
    ```

2. **Access the Application**:

    Open your browser and go to http://localhost:3000.
   
## Conclusion

This project demonstrates a full-stack application with user authentication, data management, and a responsive UI. The use of Docker ensures that the application can be easily deployed and scaled. The deployment on Azure provides a robust platform for hosting the application.



