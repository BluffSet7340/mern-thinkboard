import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
//  get the token first, the name of the cookie is called token so
    const token = req.cookies.token // should be cookies not cookie
    if(!token){
        return res.status(400).json({success: false, message: "Unauthorized - No token provided"})
    }
    try {
        // we signed the userId - given to us by MongoDB - with the JWT_SECRET from the
        // env file
        // this decodes the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success: false, message: "Unauthorized - invalid token"})
        }

        req.userId = decoded.userId // this info is passed along to the next function
        next(); // once all is said and done, move on to the next function route

    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({success: false, message: "Server error"})
    }
}