const express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

// NEW
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// CREATE
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } 
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } 
                else {
                    //add username and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
        }
    });
});

// UPDATE
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) {
            console.log(err);
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
                    res.redirect("back");
                }
                else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
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

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
}

module.exports = router;