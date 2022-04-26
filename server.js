import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import session from "express-session";

import userController from "./controllers/user-controller.js";
import commentController from "./controllers/comment-controller.js";
import likeController from "./controllers/like-controller.js";
import movieController from "./controllers/movie-controller.js";
import bookmarksController from './controllers/bookmark-controller.js';
import authController from "./controllers/auth-controller.js";
import apiController from "./controllers/api-controller.js";

//SetUp Express
const app = express();
app.use(express.json());

//SetUpCors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
//SetUpSession
app.use(session({
    secret: 'SECRET-SECRET',
    cookie: { secure: false }
}));

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DB_NAME = "netflicks";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`; // connect to the database
mongoose.connect(connectionString);

userController(app);
movieController(app);
likeController(app);
commentController(app);
bookmarksController(app);
authController(app);
apiController(app);

app.get('/', (request, response) => {
    response.send("Welcome to Group 14's API!");
});

app.listen(process.env.PORT || 4000);