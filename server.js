import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import expressLayout from "express-ejs-layouts";
import passport from "passport";
import flash from "express-flash";
import dotenv from "dotenv";

// Custom imports
import connectDB from "./app/config/db.js";
import sessionConfig from "./app/config/session.js";
import passportInit from "./app/config/passport.js";
import webRoutes from "./routes/web.js";
import setupSocket from "./app/config/socket.js";

//dotenv configuration
dotenv.config();

// filepath config for static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Session config
app.use(sessionConfig());

// Passport config
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use flash error/success messages
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
app.use((req, res) => {
  res.status(404).render('not-found/404')
})

// Server called
const server = app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

// Setup Socket.IO
const eventEmitter = setupSocket(server);
app.set("eventEmitter", eventEmitter);
