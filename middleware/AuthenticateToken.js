// Middleware to authenticate JWT token
require("dotenv").config();
const jwt = require("jsonwebtoken");

 function AuthenticateToken(req,res,next){ 

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = AuthenticateToken;