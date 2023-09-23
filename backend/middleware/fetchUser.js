var jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    const token = req.header('authToken')
    console.log(token)
    if (!token) {
        res.status(401).json({ "error": "access denied" })
    }

    try {
        console.log(process.env.JWT_SECRET)
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify.user
        
        next()
    } catch (error) {
        res.status(401).json({ "error": "Access denied1" })
    }
}

module.exports = fetchUser 