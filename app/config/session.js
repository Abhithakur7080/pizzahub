import session from "express-session";
import MongoDBStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

const sessionConfig = () => {
  const mongoStore = MongoDBStore.create({
    mongoUrl: url,
    collectionName: "sessions",
  });

  return session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  });
};

export default sessionConfig;
