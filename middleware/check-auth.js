const jwt = require('jsonwebtoken');


function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        const email = decodedToken.email;
        req.auth = { userId };
        req.email = { email };
        console.log(req.auth)
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err
        })
    }
}



module.exports = {
    checkAuth: checkAuth,
}