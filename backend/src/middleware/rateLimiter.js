// import ratelimit from "../config/upstash";
import ratelimit from "../config/upstash.js"

const rateLimiter = async (req , res, next) => {
    // with authentication we can user userid and add rate limiting based on logged in user
    try{
        // currently it looks at total number of rate limits, so if it is exceeded 
        // requests are blocked for everyone
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later"})
        }

        next() // application run as usual
    }catch(err){
        console.log("Rate limt error")
        next(err);
    }
}

export default rateLimiter;