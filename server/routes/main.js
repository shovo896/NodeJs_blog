const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// routes
// home route
router.get('', (req, res) => {
       const locals={
              title : "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. " 
       };


function insertPostData(){
       postMessage.insertMany([
              {
                     title:"First Post",
                     body:"This is the body of the first post"
              },
              {
                     title:"Second Post",
                     body:"This is the body of the second post"

              },
              {
                     title:"Third Post",
                     body:"This is the body of the third post"

              } ,
              {
                     title:"Fourth Post",
                     body:"This is the body of the fourth post"

              } ,
              {
                     title:"Fifth Post",
                     body:"This is the body of the fifth post"

              } ,
              {
                     title:"Sixth Post",
                     body:"This is the body of the sixth post"

              }     

       ])};
       insertPostData();














       res.render('index',{locals});
});

router.get('/about', (req, res) => {
       const locals = {
              title: "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. "
       };

       res.render('about', { locals });
});

router.get('/contact', (req, res) => {
       const locals = {
              title: "Contact",
              description: "Get in touch with the NodeJs Blog team."
       };

       res.render('contact', { locals });
});

module.exports = router;
