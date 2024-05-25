# Awesome Cats

A cat image gallery built with React + React Router 6 and Node.js + Express.

## Features

- View a list of cat images
- View a single cat image with details
- Create a user account and login to add, edit and delete cats

The project database is currently a local JSON file. If developed further, the backend should be connected to a proper database.

Another next step would be to add a feature to upload images to the server and store them in the database instead of using URLs.

Authentication is done with JWT tokens. The token is stored in the browser's local storage. The token is valid for 1 hour or until the user logs out.

## Requirements

- Node.js
- npm

## Installation

Installation and launching the application is done in the terminal. The Bash shell is used in these instructions.

To run this application, you need to install the required dependencies for backend and frontend. To do so, navigate to the project folder _awesome-cats_ and run the following command in both _awesome-cats/backend_ and _awesome-cats/frontend_ directories:

```bash
npm install
```

To start the development servers, run the folloing command in both _awesome-cats/backend_ and _awesome-cats/frontend_ directories:

```bash
npm run dev
```

The application frontend starts running on http://localhost:3000. If the port is already in use, close the session running on it or choose another port.

The application backend starts running on http://localhost:8080. If the port is already in use, close the session running on it and retry.

NOTE! Authentication requires a secret key that is not included in the repository. To run the application with all features, you need to create a _.env_ file in the _awesome-cats/backend_ directory and request the secret key from the project owner.
