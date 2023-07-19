# Web Chatbot Project - Fullstack README

This is a fullstack project for creating a web chatbot with features like user authentication, loan options, and conversation history export. The project consists of two main parts: frontend and backend.

## Frontend

### Description

The frontend part of the project is responsible for providing a user interface to interact with the chatbot. It utilizes the `@chatscope/chat-ui-kit-react` and `@chatscope/chat-ui-kit-styles` packages for chat UI components and styles. The frontend is built using Next.js, a React framework, and Tailwind CSS for styling.

### Installation and Setup

To set up the frontend project, follow these steps:

1. Clone this repository.
2. Navigate to the `frontend` directory.
3. Install dependencies by running `npm install`.
4. Start the development server with `npm run dev`.

### Features

- The web chatbot can interpret terms like "Hello," "Goodbye," "Good," and "I want" to initiate a conversation thread with the user.
- User authentication is required to continue the conversation.
- Strategies to parameterize the username and password can be implemented (not detailed in this README).
- Upon encountering the term "loan," the chatbot will display three options: "Do you want to apply for a loan?", "Loan conditions", and "Help."
- Clicking on any of the above options will display relevant information with a link for reference.
- When the user uses the "Goodbye" term, the conversation is finished and stored in the database.

## Backend

### Description

The backend part of the project handles user authentication, conversation storage, and serving data to the frontend. It is built using Express.js, and MySQL is used as the database for conversation history storage. The backend is written in TypeScript for better code organization and type safety.

### Prerequisites

Before executing this project, make sure you have the following installed:

- Unix-based Operating System
- Node.js (version 16.17.0 or higher)
- Docker (version 23.0.6)
- Docker-Compose (version 2.18.0)

### Instructions

Before you begin development:

1. Clone the repository.
   - Use the command: `git clone git@github.com:guigabriel/chatbot.git.git`.
   - Change into the cloned repository's folder: `cd chatbot`.
2. Create a new branch based on the master branch.
   - Check if you are on the master branch: `git branch`.
   - If you are not on the master branch, switch to it: `git checkout master`.
   - Create your branch with the following format: `git checkout -b your-github-name-project-name`.
     Example: `git checkout -b guilherme-gabriel-chatbot`.

## Docker

**Note:** Verify that Docker and Docker-Compose are installed.

1. Check the versions:
   ```bash
   docker -v
   docker-compose -v

### Running the Project

1. Ensure you are inside the project folder (use the command `pwd` to verify).
2. Create a file named `.env` at the root of the project with the following contents:

3. Example: 
```bash
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_PORT=3306
MYSQL_HOST=db
MYSQL_DB=chat_db
MYSQL_ROOT_PASSWORD=password
```
4. Use the command `docker-compose up -d --build` to create the containers for the first time.

5. Once the containers are up, enter the chat_api container with the following command:
    ```bash
    docker exec -it chat_api sh

6. Inside the container, install the project dependencies:
    ```bash
    npm install

7. Finally, run the project:
    ```bash
    npm run dev

8. To `exit` the container, type exit.

9. To stop the containers, run `docker-compose down`.
### IMPORTANT:

1. The command `docker-compose up -d --build` should be used ONLY THE FIRST TIME when bringing up the containers.

2. After the first time, you can use `docker-compose up -d` to start the containers.

### Features

- The backend handles user authentication and stores conversation data in the MySQL database.
- It provides an API endpoint for exporting historic conversations in CSV format ordered by date.

### Database Configuration

- Before starting the backend, make sure you have a MySQL server running.
- Create a database and configure the connection details in the backend's `.env` file using the `dotenv` package.

## Getting Started

1. Set up and start the backend server first.
2. Then, set up and start the frontend development server.
3. Access the frontend through the provided URL (usually `http://localhost:3000`) in your browser.

## Note

Please note that this README provides an overview of the project and basic setup instructions. For a production environment, additional considerations, such as security measures, error handling, and deployment procedures, should be taken into account.

Enjoy building your web chatbot project! If you encounter any issues or have questions, don't hesitate to consult the project documentation or seek help from the development team. Happy coding!
