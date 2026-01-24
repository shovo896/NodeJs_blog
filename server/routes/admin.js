const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const adminLayout = 'layouts/admin';


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

// admin - register
router.get('/admin/register', async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Create a new admin account."
    }

    res.render('admin/register', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});


























module.exports = router;
