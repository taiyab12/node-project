const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// const bcrypt = require('bcrypt');

const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
            return;
        }
        if (user) {
            const claims = {
                email: user.email,
                fullName: user.fullName,
                // __id: user.__id,

            };
            jwt.sign(claims, process.env.SECRET, { expiresIn: '2h' }, (error, token) => {
                if (error) {
                    res.status(403).json({
                        message: `You are not authorized ${error.message}`,
                    });
                    return;
                }
                res.status(200).json({
                    message: 'You are Logged in!',
                    token,
                });
            });
        }
    });
});
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
