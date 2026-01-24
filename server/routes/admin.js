const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');


// admin - login
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});


























module.exports = router;