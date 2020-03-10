const Campground = require('../models/campground'),
    Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkOwnership = (req, res, next) => {
    let Obj = (typeof req.params.comment_id == 'undefined')? Campground: Comment;
    if (req.isAuthenticated()) {
        Obj.findById(req.params.comment_id||req.params.id, (err, foundObj) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                if (foundObj.author.id.equals(req.user._id)) {
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

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } 
    else {
        res.redirect("/login");
    }
}

module.exports = middlewareObj;