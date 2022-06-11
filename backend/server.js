const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require("./keys").mongoURI;

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


app.use(passport.initialize());
require("./passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));