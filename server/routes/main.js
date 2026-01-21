const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// routes
// home route
router.get('', async (req, res) => {
       
       try {
              const locals={
              title : "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. " 
       };
       let perPage=10;
       let page=req.query.page || 1;

       const data= await Post.aggregate([{$sort:{createAt:-1}}])







              
              res.render('index',{locals,data});

       }  catch(error){
              console.log(error);
              res.status(500).send('Server error');

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
