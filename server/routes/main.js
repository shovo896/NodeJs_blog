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
       try {
              const data=await.Post.find();
              res.render('index',{locals,data});

       }  catch(error){
              console.log(error);

       }















       
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
