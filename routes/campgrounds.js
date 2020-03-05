const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground');

// INDEX - Show all campgrounds
router.get("/", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

// NEW - New campground form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CREATE - Add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
    //get data from form and push to campgrounds array
    let name = req.body.name,
        image = req.body.image,
        desc = req.body.desc,
        author = {
            id: req.user._id,
            username: req.user.username
        };

    let newCampground = { name: name, image: image, desc: desc, author: author };

    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - Show more information about one campground
router.get("/:id", (req, res) => {
    //Find the campground with the provided ID
    //Render show template with that campground
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
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