import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';
import expressLayout from "express-ejs-layouts";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import dotenv from "dotenv";
import MongoDBStore from "connect-mongo";
import passport from "passport";
import passportInit from "./app/config/passport.js";
import webRoutes from "./routes/web.js";

// Configure dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const url = process.env.DB_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

const connection = mongoose.connection;
connection.on("error", (err) => {
  console.error("Connection error:", err);
});

// Session store
let mongoStore = MongoDBStore.create({
  mongoUrl: url,
  collectionName: "sessions",
});

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
// Passport config
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//use flash error messages
app.use(flash());

// Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// Routes call
webRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
