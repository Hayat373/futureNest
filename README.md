# Time Capsule Web App

## Future Nest

<img width="1892" height="848" alt="image" src="https://github.com/user-attachments/assets/e903a82a-779c-4f69-ab89-ee743bdcc7db" />


A web application that allows users to create, manage, and share time capsules. Users can sign up, log in, and store messages, images, and files to be opened at a future date.

## Features

- 🔒 User authentication (Sign Up, Log In)
  <img width="1898" height="880" alt="image" src="https://github.com/user-attachments/assets/b533ca14-456d-4b31-b5be-de579fae0286" />

  
  
<img width="1906" height="865" alt="image" src="https://github.com/user-attachments/assets/054a27e5-ccf8-45d9-8d1d-08abae14b532" />



- 📦 Create and manage time capsules
  <img width="1902" height="845" alt="image" src="https://github.com/user-attachments/assets/4b4abd15-375b-4267-8b9c-5ad870ba8c39" />

- 🔗 Share time capsules with others
- 🎨 Frontend built with React
- 🖥️ Backend built with NestJS

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: NestJS, TypeORM
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

Ensure the following are installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL](https://www.postgresql.org/download/) (configured to accept connections from Docker)

### Clone the Repository

```bash
git clone https://github.com/Hayat373/futureNest.git
cd futureNest
```

# Setup Environment

## Setup with Docker 🐳
Build and Run the Docker Containers:
From the root directory of your project, run:

```bash
docker-compose up --build
```
This command will build the Docker images for both the frontend and backend and start the containers.

## Access the Application:

The frontend will be accessible at http://localhost:3001.
The backend will be accessible at http://localhost:3000.
Setup Backend (Without Docker)

If you prefer to set up the backend without Docker:
Navigate to the backend directory:

```bash
cd backend
Install dependencies:
```

```bash
npm install
```
Create a .env file based on the .env.example provided and fill in your database credentials.

Run the migrations (if applicable):
```bash
npm run migration:run
```
Start the backend server:

```bash
npm run start
```
## Setup Frontend (Without Docker)


If you prefer to set up the frontend without Docker:

Navigate to the client directory:

```bash
cd ../client
```
Install dependencies:



```bash
npm install
```
Start the frontend server:

```bash
npm start
```
## Conclusion

You now have a fully functional Time Capsule web application running locally! Feel free to explore and contribute to the project. 
