const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");
const MongoDBStore = require('connect-mongo')

dotenv.config();

const PORT = process.env.PORT || 5000;

//database connection
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

let mongoStore = MongoDBStore.create({
  mongoUrl: url,
  collectionName: 'sessions'
});

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(flash());

//assets
app.use(express.static("public"));
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//routes call
require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
