// Old code from book
// const mongoose = require('mongoose');
// const BlogPost = require('./models/BlogPost');

// mongoose.connect('mongodb://localhost:27017/blogdb');

// BlogPost.create({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills.Energy - saving is one of my favourite money topics, because once you get past the boring bullet- point lists, a whole new world of thrifty nerdery opens up.You know those bullet - point lists.You start spotting them everything at this time of year.They go like this:'
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// });

// new code

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

async function run() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogdb');

        // const blogpost = await BlogPost.create({
        //     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
        //     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills.Energy - saving is one of my favourite money topics, because once you get past the boring bullet- point lists, a whole new world of thrifty nerdery opens up.You know those bullet - point lists.You start spotting them everything at this time of year.They go like this:'
        // });

        // const blogposts = await BlogPost.find({});

        // const blogposts = await BlogPost.find({
        //     title: /The/
        // });

        var id = "6992f32052347c49b7af5297";

        // const blogpost = await BlogPost.findById(id);

        // const blogpost = await BlogPost.findByIdAndUpdate(
        //     id,
        //     { title: 'Updated title' },
        //     { new: true } // returns the updated document
        // );

        const blogpost = await BlogPost.findByIdAndDelete(id);

        console.log(blogpost);
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

run();