const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Company, Warehouse, Rack } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { login, join, logout } = require('../controllers/auth');

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['pw']
        },
        include: [{
          model: Company,
          include: [{
            model: Warehouse,
            include: [{
                model: Rack
            }]
          }]
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, login);

router.post('/', isNotLoggedIn, join);

router.post('/logout', isLoggedIn, logout);

module.exports = router