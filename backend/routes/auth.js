const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/fetchUser")


//route to create a user
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('emailId', 'enter a valid email').isEmail(),
    body('password', 'password must be at least 5 characters').isLength({ min: 5 }),
    body('occupation', 'enter occupation').isLength({ min: 3 }),
    body('age', 'enter age').isLength({ min: 1 }),
    body('language', 'enter language').isLength({ min: 2 }),
], async (req, res) => {
    // storing the output of the validation requests
    const errors = validationResult(req);
    // if the errors var is not empty send error 400 and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // trying to update the db with the data sent
    try {
        // destructuring the request using the correct key names
        const { name, emailId, password, occupation, age, language } = req.body;

        const hashedSaltedPassword = bcrypt.hashSync(password, 10);



        // updating the db with data
        const newUser = await prisma.user.create({ data: { name, emailId, password: hashedSaltedPassword, occupation, age, language } });
        console.log(newUser);
        res.status(200).json(req.body);
    } catch (error) {
        console.error("error adding user", error);
        res.status(400).json({ error: "internal error" });
    }
});
//route to create a professional account
router.post('/createlegalserviceprovider', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('emailId', 'enter a valid email').isEmail(),
    body('password', 'password must be at least 5 characters').isLength({ min: 5 }),
    body('location', 'location must be at least 5 characters').isLength({ min: 5 }),
    body('yearsOfExperience', 'must be something').notEmpty(),
    body('quickService', 'must be true of false').notEmpty(),
    body('barAssociation', 'should be something').isLength({ min: 4 }),
], async (req, res) => {
    // storing the output of the validation requests
    const errors = validationResult(req);
    // if the errors var is not empty send error 400 and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // trying to update the db with the data sent
    try {
        // destructuring the request using the correct key names
        const { name, emailId, password, location, yearsOfExperience, quickService, barAssociation } = req.body;

        const hashedSaltedPassword = bcrypt.hashSync(password, 10);

        // updating the db with data
        const newUser = await prisma.legalServiceProviders.create({ data: { name, emailId, password: hashedSaltedPassword, location, yearsOfExperience, quickService, barAssociation } });
        console.log(newUser);
        res.status(200).json(req.body);
    } catch (error) {
        console.error("error adding user", error);
        res.status(400).json({ error: "internal error" });
    }
});
//route for user login
router.post('/login/user',  [
    body('emailId', 'Enter a valid email').isEmail(), // emailId should be an email
    body('password', 'Password cannot be blank').notEmpty(),// password cannot be blank
], async (req, res) => {
    // storing the output of the validation requests
    const errors = validationResult(req);

    // if the errors var is not empty send error 400 and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request using the correct key names
    const { emailId, password } = req.body;
    try {
        // checking if the user exists
        const user = await prisma.user.findUnique({ where: { emailId } });

        // if the user does not exist send error 400 and the error
        if (!user) {
            return res.status(400).json({ error: "Wrong credentials" });
        }
        // comparing the password sent with the password in the db
        const passwordCompare = await bcrypt.compare(password, user.password);


        // if the passwords do not match send error 400 and the error
        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // Return user ID and token in the response
        res.json({ userId: user.id, token, language: user.language });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//route for legal service provider login
router.post('/login/legalserviceprovider', [
    body('emailId', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { emailId, password } = req.body;
    try {
        const user = await prisma.legalServiceProviders.findUnique({ where: { emailId } });

        if (!user) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // Return user ID and token in the response
        res.json({ userId: user.id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//route to get all provider detaills
router.get('/getallproviders', verifyToken ,async (req, res) => {
    try {
        const userId = req.userId;
        //checking if the user exists and has logged in 
        if (!userId) {
            return res.status(400).json({ error: "Wrong credentials" });
        }
        const allproviders = await prisma.legalServiceProviders.findMany();
        res.status(200).json(allproviders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router
