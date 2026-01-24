const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User=require('../models/User');
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




// admin - register POST
router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Handle the case when the username is already taken
      return res.status(400).send('Username already exists');
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect('/admin');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});






















module.exports = router;
