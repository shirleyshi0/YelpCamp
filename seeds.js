const mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

let data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Facilisis leo vel fringilla est ullamcorper eget nulla. Mollis aliquam ut porttitor leo a diam sollicitudin. Libero volutpat sed cras ornare arcu dui vivamus arcu. Aliquam sem fringilla ut morbi tincidunt augue. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Mauris vitae ultricies leo integer malesuada. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Sit amet est placerat in. Sed turpis tincidunt id aliquet risus feugiat in. Volutpat commodo sed egestas egestas. Aenean et tortor at risus viverra. In pellentesque massa placerat duis ultricies lacus sed. Risus quis varius quam quisque id. Velit ut tortor pretium viverra suspendisse potenti nullam. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Imperdiet nulla malesuada pellentesque elit eget. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt."
    },
    {
        name: "Salmon Lake",
        image: "https://images.unsplash.com/photo-1543039625-14cbd3802e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum sagittis. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Risus pretium quam vulputate dignissim suspendisse in est. Tortor consequat id porta nibh venenatis cras sed. Orci dapibus ultrices in iaculis nunc sed augue lacus. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Mattis nunc sed blandit libero volutpat sed cras ornare. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Tellus at urna condimentum mattis pellentesque id nibh tortor id."
    },
    {
        name: "Granite Falls",
        image: "https://images.unsplash.com/photo-1534770406361-3bfa1129f8de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus. Aliquam id diam maecenas ultricies mi. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Mi proin sed libero enim sed faucibus turpis in. Placerat vestibulum lectus mauris ultrices. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Adipiscing commodo elit at imperdiet dui accumsan. Tempor orci eu lobortis elementum nibh tellus molestie. Leo urna molestie at elementum eu. Eget duis at tellus at."
    },
    {
        name: "Devils Garden Campground",
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris pharetra et ultrices neque ornare aenean. Vitae auctor eu augue ut lectus arcu bibendum at varius. In fermentum posuere urna nec tincidunt. Amet nisl purus in mollis nunc sed id semper risus. In fermentum et sollicitudin ac orci phasellus. Tellus id interdum velit laoreet id donec ultrices. Convallis tellus id interdum velit laoreet id donec. Adipiscing tristique risus nec feugiat in. Pellentesque habitant morbi tristique senectus et netus et. Facilisis sed odio morbi quis commodo odio aenean. Blandit aliquam etiam erat velit."
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        } 
        else {
            console.log('removed campgrounds!');
            Comment.remove({}, (err) => {
                if (err) {
                    console.log(err);
                } 
                else {
                    console.log('removed comments!');
                    //Add campgrounds
                    // data.forEach((seed) => {
                    //     Campground.create(seed, (err, campground) => {
                    //         if (err) {
                    //             console.log(err);
                    //         } 
                    //         else {
                    //             console.log("NEWLY CREATED CAMPGROUND");
                    //             // Comment.create({
                    //             //     text: "This place is grate, but I wish there was internet",
                    //             //     author: "Homer"
                    //             // }, (err, comment) => {
                    //             //     campground.comments.push(comment);
                    //             //     campground.save();
                    //             //     console.log("Created new comment");
                    //             // });
                    //         }
                    //     });
                    // });
                }
            });
        }
    });
}

module.exports = seedDB;