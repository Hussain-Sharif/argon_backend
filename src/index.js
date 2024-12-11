import dotenv from 'dotenv';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path'
import { fileURLToPath } from 'url';


import {app} from './app.js'

dotenv.config()  // .env config

const __filename = fileURLToPath(import.meta.url);  // due to using ES module we get the url for this current file
const __dirname = path.dirname(__filename); // we get the folder url for this current file

const dbPath = path.join(__dirname, 'argonDb.db'); // assigned here buddy!
console.log(dbPath)
let db=null
let port=process.env.PORT || 7000

// C:\Users\hp\OneDrive\Desktop\Sharif_notes_files\argon_backend\src\db\argonDB.db
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(port, () => {
            console.log(`Server Running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.log(`DB connection with server Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

export {db}


// The command to Run the index.js is npm start where the start keyword is being configured as nodemon src/index.js go and check package.json


