const express = require('express');
const router = express.Router();

const signInUser = require('../services/user.signin');
const registerUser = require('../services/user.register')

//Users SignIn

router.post('/signin', async (req, res) => {
  try{
    await signInUser(req.body)
    .then(token => {
      res.status(200).json(token)
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    })
  }catch(err){
    res.status(500).json({
      error: err.message
    })
  }
})

//Registering Users

router.post('/register', async (req, res) => {
  try {
    await registerUser(req.body)
      .then(user => {
        res.status(200).json({
          accessToken: user.token
        })
      })
      .catch(err => {
        res.status(400).json({
          error: err
        })
      })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router;