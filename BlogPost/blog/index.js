const express = require('express');
const app = new express();
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

mongoose.connect('mongodb://localhost:27017/blogdb');

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {
    try {
        // model creates a new doc with browser data
        await BlogPost.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating blog post');
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});