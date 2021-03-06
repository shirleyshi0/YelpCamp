const express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware');

// INDEX - Show all campgrounds
router.get("/", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            req.flash("error", "Opps! Something went wrong.")
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

// NEW - New campground form
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    //get data from form and push to campgrounds array
    let name = req.body.name,
        image = req.body.image,
        price = req.body.price,
        desc = req.body.desc,
        author = {
            id: req.user._id,
            username: req.user.username
        };

    let newCampground = { name: name, image: image, price: price, desc: desc, author: author };

    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            req.flash("error", "Opps! Something went wrong.")
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - Show more information about one campground
router.get("/:id", (req, res) => {
    //Find the campground with the provided ID
    //Render show template with that campground
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err || !foundCampground) {
            req.flash("error", "Sorry, campground does not exist!");
            console.log(err);
            return res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// EDIT - campground edit form
router.get("/:id/edit", middleware.checkOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Sorry, campground does not exist!");
            res.redirect("back");
        }
        else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

// UPDATE - update campground to the DB
router.put("/:id", middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            console.log(err);
            req.flash("error", "Sorry, campground does not exist!");
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE - Deletes a campground
router.delete("/:id", middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.")
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Campground deleted.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;