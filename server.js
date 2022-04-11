import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import helloController from "./controllers/hello-controller.js";
import userController from "./controllers/user-controller.js";
import tuitController from "./controllers/tuit-controller.js";

const PROTOCOL = "mongodb+srv";
//const DB_USERNAME = process.env.USERNAME;
//const DB_PASSWORD = process.env.PASSWORD;
//const HOST = "";
//const DB_NAME = ""
//const DB_QUERY = "retryWrites=true&w=majority";
//const connectionString = `${PROTOCOL}://webDev:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;// connect to the database
//mongoose.connect(connectionString);

const app = express();
app.use(cors());
app.use(express.json());

helloController(app);
userController(app);
tuitController(app);

app.listen(process.env.PORT || 4000);