const express = require("express");
const moment = require("moment");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const now = moment();

// Setting up the Handlebars view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Making a static directory for the styling part
app.use(express.static(path.join(__dirname, "public")));

// Creating Work days and hours
const workDays = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday"];
const workHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

// Logger middleware
const logger = (req, res, next) => {
  if (
    workDays.some((el) => el === now.format("dddd")) &&
    workHours.some((el) => el === now.format("kk"))
  ) {
    next();
  } else {
    res.redirect("error");
  }
};

// Routing for Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Routing for contact Page
app.get("/contact", logger, (req, res) => {
  res.render("contact");
});

// Routing for Services Page
app.get("/services", logger, (req, res) => {
  res.render("services");
});

// Routing for Error Page
app.get("/error", (req, res) => {
  res.render("error");
});

// Setting the listening Port
const PORT = process.env.PORT || 5000;

// Setting the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
