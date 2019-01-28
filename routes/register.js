require('./../models/Users');
require('../init/connect');
const express = require('express');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const router = express.Router();


const User = mongoose.model('User');

router.post('/', (req, res) => {
// console.log('Here in register POST');
    const newUser = new User(req.body);
    newUser.save((error, user) => {
        if (error) {
            return res.status(400).send({
                message: error.message,
            });
        }

        return res.status(200).json(user);
    });
});


module.exports = router;
