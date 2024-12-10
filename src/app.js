import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}));
app.use(cookieParser());


//Import Routes...
import {userRouter} from './routes/user.routes.js';
import { technicianRouter } from './routes/technician.routes.js';

// Delcaring the Imported Routers

app.use("/api/v1/user",userRouter);
app.use("/api/v1/technician",technicianRouter);


export {app}