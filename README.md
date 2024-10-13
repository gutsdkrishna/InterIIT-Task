InterIIT Task Project
=====================

Overview
--------

This project is a web-based application that allows users to view and manage items stored in various godowns (warehouses). The project is divided into a frontend (React) and backend (Node.js, Express, MongoDB), both of which are containerized using Docker for easy setup and deployment.

Thought Process and Design
--------------------------

1.  **Frontend**:

    -   The frontend is built using React and styled components. It is designed to be responsive and user-friendly.
    -   The main feature is a dashboard where users can view godowns, search for items by category or name, and explore items stored in specific godowns.
2.  **Backend**:

    -   The backend is built with Node.js and Express, with MongoDB as the database. It provides several APIs to fetch godowns and items, as well as a search feature to find items globally across all godowns.
    -   It connects to a MongoDB instance and uses a separate database for godowns and items.
3.  **Dockerization**:

    -   Both the frontend and backend are containerized using Docker. This ensures consistent environments across development and production and simplifies the setup process.

Steps Taken to Implement the Project
------------------------------------

1.  **Setup**:

    -   Set up the React frontend and Node.js backend separately, ensuring they both run independently.
    -   Set up MongoDB for storing godown and item data.
2.  **API Development**:

    -   Created RESTful APIs in the backend for fetching godown data and items, and added a search API for item queries.
3.  **Frontend Integration**:

    -   Integrated the backend APIs into the React frontend using Axios for HTTP requests. The frontend communicates with the backend to display godowns and item data dynamically.
4.  **Dockerization**:

    -   Created Dockerfiles for both the frontend and backend and used Docker Compose to run both services simultaneously in containers.
5.  **Testing and Debugging**:

    -   Debugged issues with API connections, environment variables, and Docker networking to ensure seamless communication between the frontend and backend.

Running the Project Locally
---------------------------

### Prerequisites

-   Node.js and npm installed
-   MongoDB running locally or hosted
-   Docker installed

### Steps to Run Locally

1.  **Clone the repository**:
     ```bash
   git clone <repository-url>
   cd <repository-directory>```

2.  **Access the app**:

    -   Frontend: `http://localhost:3000`
    -   Backend API: `http://localhost:5000/api` (or depending on your Docker setup)

Deployment Links
----------------

-   **Frontend**: [Deployed Frontend URL]
-   **Backend**: [Deployed Backend URL]

Conclusion
----------

This project demonstrates the full-stack development process, from setting up a React frontend and Node.js backend to containerizing the app for deployment. The goal was to create a scalable and maintainable structure using modern tools and technologies.
