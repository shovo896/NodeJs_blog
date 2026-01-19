const express = require('express');
const router = express.Router();

// routes
router.get('', (req, res) => {
       const locals={
              title : "NodeJs Blog",
              description: "Simple blog created with NodeJs and ExpressJs and MongoDB. " 
       }





       res.render('index');
});

router.get('/about', (req, res) => {
       res.render('index');
});

module.exports = router;
