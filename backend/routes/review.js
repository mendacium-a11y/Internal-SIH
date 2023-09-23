const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
// const fetchUser = require("../middleware/fetchUser")



const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

router.post('/addreview', verifyToken, async (req, res) => {
    try {
        const { legalServiceProviderId, stars, review } = req.body;
        const userId = req.userId;

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the legal service provider exists
        const legalServiceProvider = await prisma.legalServiceProviders.findUnique({
            where: { id: legalServiceProviderId },
        });

        if (!legalServiceProvider) {
            return res.status(404).json({ message: 'Legal Service Provider not found.' });
        }

        // Create a new review
        const newReview = await prisma.reviews.create({
            data: {
                stars,
                review,
                legalServiceProvider: { connect: { id: legalServiceProviderId } },
                user: { connect: { id: userId } },
            },
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/getreviews', verifyToken, async (req, res) => {
    try {
        const { legalServiceProviderId } = req.body;
        const userId = req.userId;

        const reviews = await prisma.reviews.findMany({
            where: { legalServiceProviderId },
            include: {
              user: {
                select: {
                  name: true,    // Include the name field
                  emailId: true, // Include the emailId field
                },
              },
            },
          });
          
        console.log(reviews)
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
})


module.exports = router;

