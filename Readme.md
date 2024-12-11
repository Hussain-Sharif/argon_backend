# Argon backend application

This project is a Argon backend application built using **Express** and **Node.js**, with **SQLite** as the database.

## Features

- RESTful API built with Express.js
- SQLite database for lightweight and efficient data management
- Organized project structure for scalability and maintainability
- API testing using Postman

## Setup

### Prerequisites
Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [SQLite](https://www.sqlite.org/index.html)
- [Postman](https://www.postman.com/) (optional, for testing APIs)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000` by default.

## Database Configuration

The project uses an SQLite database. Ensure the database file (`argonDB.db`) is located in the `db` folder or modify the configuration in the project as needed.

## API Endpoints

All API endpoints are available in the **Postman collection**. You can find the exported Postman JSON file in the [public folder](./public/). Import this file into Postman to view and test all the available endpoints.

## Testing with Postman

1. Open Postman.
2. Import the JSON file from the [public folder](./public/argon.postman_collection.json).
3. Run and test the endpoints directly from Postman.



## Dependencies



Here are the main dependencies used in this project:

- **Express**: Web framework for Node.js
- **SQLite3**: Database library for SQLite
- **multer**: For temporary Image handling
- **cloudinary**: For Image handling to save in cloudinar and get Link of Image
- **Dotenv**: For managing environment variables


To view all dependencies, check the `package.json` file.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Ensure your code adheres to the existing style and structure.

## License

This project is licensed under the [MIT License](./LICENSE).
