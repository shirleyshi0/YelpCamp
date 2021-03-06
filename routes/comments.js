const express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');

// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash("error", "Opps! Something went wrong.")
            console.log(err);
        } 
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.")
            res.redirect("/campgrounds");
        } 
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Opps! Something went wrong.")
                    console.log(err);
                    res.redirect("/campgrounds");
                } 
                else {
                    //add username and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.")
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
        }
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.")
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:comment_id", middleware.checkOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.")
            res.redirect("back");
        }
        else {
            Campground.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: req.params.comment_id
                }
            }, (err, data) => {
                if(err) {
                    console.log(err);
                    req.flash("error", "Opps! Something went wrong.")
                    res.redirect("back");
                }
                else {
                    req.flash("success", "Comment deleted.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;