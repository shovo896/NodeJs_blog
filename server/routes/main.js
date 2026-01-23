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
       .skip(perPage * page - perPage)
       .limit(perPage)
       .exec();


       const count= await Post.countDocuments();
       const nextPage= parseInt(page)+1;
       const hasNextPage= count > perPage * page;
       const previousPage= parseInt(page)-1;
       const hasPreviousPage= previousPage >=1;







              
              res.render('index',{locals,data,current:page,nextPage:hasNextPage?nextPage:null});

       }  catch(error){
              console.log(error);
              res.status(500).send('Server error');

       }

});



router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});

/** post post search term */
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
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
