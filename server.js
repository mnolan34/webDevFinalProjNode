import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

//Import controllers
import userController from "./controllers/user-controller.js";

//Connect to Database
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.USERNAME;
const DB_PASSWORD = process.env.PASSWORD;
const HOST = process.env.DB_HOST;
const DB_NAME = "netflicks";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;// connect to the database
mongoose.connect(connectionString);

//Build the App
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());
//TODO Doublecheck below notation
app.use(express.session());


userController(app);
movieController(app);

app.get('/', (req, res) =>
    res.send('Welcome!'));


app.listen(process.env.PORT || 4000);