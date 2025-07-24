const express = require("express");
const router = express.Router();
const { db } = require("../database");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, user) => {
    if (user) {
      req.session.user = { id: user.id, role: user.role, name: user.name };
      res.redirect("/leave/dashboard");
    } else {
      res.send("Błędne dane logowania.");
    }
  });
});

module.exports = router;