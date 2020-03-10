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
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handles login logic
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back, " + req.body.username + "!"
    }) (req, res);
});

//Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;