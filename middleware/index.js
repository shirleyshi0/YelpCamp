const Campground = require('../models/campground'),
    Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkOwnership = (req, res, next) => {
    let Obj = (typeof req.params.comment_id == 'undefined')? Campground: Comment;
    if (req.isAuthenticated()) {
        Obj.findById(req.params.comment_id||req.params.id, (err, foundObj) => {
            if (err || !foundObj) {
                console.log(err);
                req.flash("error", "Something went wrong.");
                res.redirect("back");
            }
            else {
                if (foundObj.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                }

            }
        });
    }
    else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } 
    else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;