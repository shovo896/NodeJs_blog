const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const adminLayout = 'layouts/admin';

const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect('/admin');
};

// admin - login
router.get('/admin', async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      return res.redirect('/admin/dashboard');
    }

    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    const registered = req.query.registered === '1';

    res.render('admin/index', { 
      locals, 
      layout: adminLayout,
      message: registered ? 'Registration successful. Please log in.' : null
    });
  } catch (error) {
    console.log(error);
  }
});

// admin - login POST
router.post('/admin', async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('admin/index', { 
        locals, 
        layout: adminLayout,
        message: 'Username and password are required.'
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.render('admin/index', { 
        locals, 
        layout: adminLayout,
        message: 'User not found. Please register first.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render('admin/index', { 
        locals, 
        layout: adminLayout,
        message: 'Invalid password.'
      });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    return res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// admin - register
router.get('/admin/register', async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Create a new admin account."
    };

    res.render('admin/register', { locals, layout: adminLayout, message: null });
  } catch (error) {
    console.log(error);
  }
});

// admin - register POST
router.post('/admin/register', async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Create a new admin account."
    };
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('admin/register', { 
        locals, 
        layout: adminLayout,
        message: 'Username and password are required.'
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('admin/register', { 
        locals, 
        layout: adminLayout,
        message: 'Username already exists. Please log in.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.redirect('/admin?registered=1');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// admin - dashboard
router.get('/admin/dashboard', requireAuth, async (req, res) => {
  try {
    const locals = {
      title: "Admin Dashboard",
      description: "Admin dashboard."
    };

    const data = await Post.find().sort({ createdAt: -1 });

    res.render('admin/dashboard', { locals, layout: adminLayout, username: req.session.username, data });
  } catch (error) {
    console.log(error);
  }
});

// admin - logout
router.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin');

    
  });
});

module.exports = router;
