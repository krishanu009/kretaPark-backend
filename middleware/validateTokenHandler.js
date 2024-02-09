const asyncHandler = require("express-async-handler");
const jwt  =  require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res, next)=>{

    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
       token = authHeader.split(" ")[1]; // split based on " " and get the 2nd value from the array i.e the token 
       
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status(401);
            throw new Error("User is not authorized");
            next();
        }
         req.user = decoded.user;
         console.log(req.user);
         
         next();
         
       })
       
       if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }
    }
    
})

module.exports = validateToken;
