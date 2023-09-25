const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/fetchUser");


const fetch = require('node-fetch');

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
            'X-RapidAPI-Key': process.env.TRANSLATE_API_KEY,
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

const llmCall = async (question) => {
    const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.AI_KEY,
            'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": question
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON
        // console.log(result);
        const responseMessage = result.choices[0].message.content;
        return responseMessage
    } catch (error) {
        console.error(error);
    }
}


router.post('/response', async (req, res) => {
    try {
        console.log(req.body)
        const { message } = req.body; // Use req.query to get query parameters
        console.log(`question ${message} `);
        const response = await llmCall(message);
        res.status(200).json({ response: response }); // Send a response to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
