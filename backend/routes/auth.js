const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "qwerty";

// Route for signup a new account

router.post('/signup', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })

], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email }); //findOne is used to find a given parameter inside the database
        if (user) {
            return res.status(400).json({ success, error: "user already exists" })
        }

        // Code to hash our password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({  //This will create a new user in the database
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        //this is for authentication
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "some error occured");
    }

})

// authenticate a user using :post "api/auth/login", no login required

router.post('/login', [

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cant be blank').exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "pls try with correct credentials" });

        }

        const passwordcompare = await bcrypt.compare(password, user.password);

        if (!passwordcompare) {
            success = false;
            return res.status(400).json({ success, error: "pls try with correct password" });

        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });


    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "something went wrong " });
    }


})


// get logged in details using : post "/api/auth/getuser"   login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id
        const _user = await User.findOne({ _id: userId }).select("-password");
        res.send(_user)

    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("internal server error")
    }



})



module.exports = router;