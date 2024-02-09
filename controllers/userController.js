const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc login user
//@route POST /api/user
//@access public

const loginUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide Username & Password");
  }
const user = await User.findOne({email});
if(user &&  await bcrypt.compare(password, user.password))
{
  const accesToken = jwt.sign({
    user: {
      userName: user.userName,
      email: user.email,
      id: user.id
    }
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m"
    }

  
  );
  res.status(200).json({accesToken})
}
else{
  res.status(401);
  throw new Error("Please Check the credentials!");
}

});

//@desc Register user
//@route POST /api/user
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  
  if (!userName || !password || !email) {
    console.log(req.body);
    res.status(400);
    throw new Error("All the fileds are mendatory!");
  }
  
    const userAvailable = await User.findOne({email});

  if(userAvailable)
  {
    res.status(400);
    throw new Error("User already exists!");
  }
  else{

    const hashedPassword = await  bcrypt.hash(password, 10);
    
    const user = await User.create({
       userName,
        email,
        password: hashedPassword
      });

      if(user) {
        const accesToken = jwt.sign({
          user: {
            userName: user.userName,
            email: user.email,
            id: user.id
          }
        },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m"
          }
        );
        
        res.status(200).json({_id:user.id, email: user.email, accesToken});
      }
      else{
        res.status(400);
        throw new Error("User data is not valid!");
      }
      
  }


});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("here");
  res.status(200).json(req.user);
});



module.exports = {loginUser, registerUser, currentUser};