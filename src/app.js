import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}));

// Optional: Explicit OPTIONS handler if you're not using cors middleware globally
app.options('*', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());




//Import Routes...
import {userRouter} from './routes/user.routes.js';
import { technicianRouter } from './routes/technician.routes.js';
import { citiesRouter } from './routes/city.routes.js';
import { applianceRouter } from './routes/appliance.routes.js';

// Delcaring the Imported Routers

app.use("/api/v1/user",userRouter);
app.use("/api/v1/technician",technicianRouter);
app.use("/api/v1/city",citiesRouter);
app.use("/api/v1/appliance",applianceRouter)

export {app}