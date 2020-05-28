const mongoose = require('mongoose'),
    Comment = require("./comment");

let campgroundSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    desc: String,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// PRE HOOK - delete comments along with campground
campgroundSchema.pre('findOneAndDelete', async function () {
    console.log("prehook triggered");
    let thisCampground = await this.model.findOne({
        _id: this.getFilter()._id
    });
    await Comment.deleteMany({
        _id: {
            $in: thisCampground.comments
        }
    });
});

let Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;