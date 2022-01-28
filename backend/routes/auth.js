const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "qwerty";


router.post('/', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {



        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);


        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

    //   .then(user => res.json(user))
    //   .catch((err)=>{
    //       console.log(err);
    //       res.json({
    //           message: "pls send uniqe email",
    //           error:err.message
    //       })
    //   });
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
            return res.status(400).json({ error: "pls try with correct credentials" });

        }

        const passwordcompare =await bcrypt.compare(password, user.password);

        if (!passwordcompare) {
            return res.status(400).json({ error: "pls try with correct password" });

        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});


    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"something went wrong "});
    }


})


// get logged in details using : post "/api/auth/getuser"   login required

router.post('/getuser',fetchuser, async (req, res) => {

    try {
        userId = req.user.id
        const user = await User.findOne({userId}).select("-password");
        res.send(user)

    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("internal server error")
    }



})



module.exports = router;