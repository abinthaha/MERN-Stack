const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = '../../config/keys.js';

const User = require('../../models/User');

const {
    check,
    validationResult
} = require('express-validator/check');

// @route   POST api/users
// @desc    Register User
// @access  Public

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid Email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({
            min: 6
        })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { name, email, password } = req.body;

    try {

        // See if the user already exists

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ errors: [{
                message: 'User already exists'
            }]})
        }
    
        user = new User({
            name,
            email,
            password
        });
    
        // Encrypt password

        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);

        await user.save();
    
        // Return JWT
        const payload = {
            user: {
                id: '123sdf3',
            }
        }

        jwt.sign(
            payload, 
            "configJwtSecrets", 
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        )
    }

    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }    
});

// @route   PUT api/users
// @desc    Update User
// @access  Public

router.put('/', async(req, res) => {
    let { email, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    //     password = await bcrypt.hash(password, salt);

    let user = await User.findOneAndUpdate({email}, {$set: {...req.body, password}}, {new: true});
    res.json(user)
})

// @route   GET api/users
// @desc    Get all users
// @access  Public

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/users
// @desc    Delete Specified User
// @access  Public

router.delete('/', async(req, res) => {
    try {
        const { email } = req.body;
        console.log(req)
        const user = await User.findOneAndDelete({ email })
        res.json(user);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;