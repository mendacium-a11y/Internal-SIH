const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken');
// const fetchUser = require("../middleware/fetchUser")



router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('emailId', 'enter a valid email').isEmail(),
    body('password', 'password must be at least 5 characters').isLength({ min: 5 }),
    body('occupation', 'enter occupation').isLength({ min: 3 }),
    body('age', 'enter age').isLength({ min: 1 })
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
        const { name, emailId, password, occupation, age } = req.body;

        const hashedSaltedPassword = bcrypt.hashSync(password, 10);



        // updating the db with data
        const newUser = await prisma.user.create({ data: { name, emailId, password: hashedSaltedPassword, occupation, age } });
        console.log(newUser);
        res.status(200).json(req.body);
    } catch (error) {
        console.error("error adding user", error);
        res.status(400).json({ error: "internal error" });
    }
});

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
        const newUser = await prisma.legalServiceProviders.create({ data: { name, emailId, password:hashedSaltedPassword, location, yearsOfExperience, quickService, barAssociation } });
        console.log(newUser);
        res.status(200).json(req.body);
    } catch (error) {
        console.error("error adding user", error);
        res.status(400).json({ error: "internal error" });
    }
});


//route at /api/auth/login, logging in a user and sending a jwt token
// router.post('/login', [
//     body('email', 'enter valid email').isEmail(),
//     body('password', 'cannot be blank').exists()
// ], async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ error: errors.array() })
//     }

//     const { email, password } = req.body
//     try {
//         const user = await prisma.user.findUnique({ where: { email } })

//         if (!user) {
//             return res.status(400).json({ "error": "wrong credentials" })
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password)

//         if (!passwordCompare) {
//             return res.status(400).json({ "error": "wrong credential" })
//         }

//         const data = { user: { id: user.id } }
//         const authToken = jwt.sign(data, process.env.JWT_SECRET)
//         res.json({ "jwt": authToken })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json("error")
//     }
// })


// // get logged in user details at /api/auth/getid login requries
// router.post('/getid', fetchUser, async (req, res) => {
//     try {
//         var userId = req.user.id
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: userId
//             },
//             select: {
//                 id: true,
//                 email: true,
//                 name: true
//             }
//         })
//         res.json(user)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ "error": "internal error" })
//     }
// })
module.exports = router
