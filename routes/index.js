const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//Root Route
router.get("/", (req, res) => {
    res.render("landing");
});

// Register form
router.get("/register", (req, res) => {
    res.render("register");
});

// Handles register logic
router.post("/register", (req, res) => {
    let newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

// Login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handles login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
});

//Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    else {
        res.redirect("/login");
    }
}

module.exports = router;