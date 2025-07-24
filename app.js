const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const { db, initializeDatabase } = require("./database");

const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "tajny-klucz",
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", authRoutes);
app.use("/leave", requestRoutes);

initializeDatabase();
app.listen(PORT, () => {
  console.log("Serwer działa na porcie " + PORT);
});