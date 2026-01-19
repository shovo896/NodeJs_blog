const express = require('express');
const router = express.Router();

// routes
router.get('', (req, res) => {
       const locals={
              title : "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. " 
       }





       res.render('index',{locals});
});

router.get('/about', (req, res) => {
       const locals = {
              title: "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. "
       };

       res.render('about', { locals });
});

module.exports = router;
