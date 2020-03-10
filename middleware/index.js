const Campground = require('../models/campground'),
    Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }

            }
        });
    }
    else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
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

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } 
    else {
        res.redirect("/login");
    }
}

module.exports = middlewareObj;