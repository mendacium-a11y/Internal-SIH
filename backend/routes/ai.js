const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/fetchUser")

const fetch = require('node-fetch');


const airesponse = async (question, lang) => {

    const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f6ceb926aamsh7f92b724d064652p19513ajsn0066cf168aaa',
            'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        },
        body: {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: question
                }
            ]
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return translate(JSON.parse(result), lang) 
    } catch (error) {
        console.error(error);
    }
}

const translate = async (text, lang) => {
    console.log("invoked")
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', lang);
    encodedParams.set('text', text);
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'X-RapidAPI-Key': 'f6ceb926aamsh7f92b724d064652p19513ajsn0066cf168aaa',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        return JSON.parse(result).data.translatedText;

    } catch (error) {
        console.error(error);
    }
}

// const verifyToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. Token missing.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token.' });
//     }
// };


router.get('/response', verifyToken, async (req, res) => {
    try {
        const { question } = req.body;
        const userId = req.userId;

        const language = await prisma.user.findUnique({
            where: { userId },
            select: { language: true }
        });
        
        const response = await airesponse(question, language.language)

        // for (let i = 0; i < reviews.length; i++) {
        //     reviews[i].review = await translate(reviews[i].review, "hi");
        // }


        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
})


module.exports = router;

