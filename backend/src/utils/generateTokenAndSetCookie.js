// we creating a JSON web token
import jwt from 'jsonwebtoken'

// pass in the userid and sign it with the secret and this token will be valid for 7 days
// decoding the token we know which user has the token and then fetch data belonging to the user
export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    // setting the cookie for the token
    res.cookie("token", token, {
        httpOnly: true, // prevents the cross site scripting attack, i think it is client side??
        secure: process.env.NODE_ENV=="production", // use https in production
        sameSite: "strict", // prevents the cross site request forgery exploit, which takes advantage of browsers sending the cookie automatically
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return token;
}