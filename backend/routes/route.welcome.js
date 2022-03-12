const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({message: 'Welcome to the API'});
});

module.exports = router;
