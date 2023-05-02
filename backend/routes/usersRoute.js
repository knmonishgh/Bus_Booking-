const router = require('express').Router();
const User = require("../models/usersmodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

require('dotenv').config();

router.post('/google-login', async (req, res) => {
  try {
    const { userInfo } = req.body;
  
    const { email, name } = userInfo;
    
    
    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
     
    // Hash the password for 10 times with bcrypt
    const hashedPassword = await bcrypt.hash("Presi@123", 10);  

      // Create a new user if the user does not exist
      user = new User({
        email,
        name,
        password: hashedPassword,
      });
      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});




router.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }] });
        if (existingUser) {
            if (existingUser.email === req.body.email) {
                return res.send({
                    message: "User with this email already exists",
                    success: false,
                    data: null
                });
            } 
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "User created succesfully",
            success: true,
            data: null
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null
        });

    }
});





router.post("/login", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            return res.send({
                message: "User does not exist",
                success: false,
                data: null,
            });
        }
      console.log(userExists)
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            userExists.password
        );
        if (!passwordMatch) {
            return res.send({
                message: "Incorrect password",
                success: false,
                data: null
            });
        }

        //to generate  jwt token : encrypted from of any data 
        const token = jwt.sign({ userId: userExists._id }, "test", {
            expiresIn: "7d"
        });

        res.send({
            message: "Login successful",
            success: true,
            data: token
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null
        });

    }
})



// to validate token of user to enter into home page
//get by user id
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      res.send({
        message: "User fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  });

// get all users
router.post("/get-all-users", authMiddleware, async (req, res) => {
    try {
      const users = await User.find({});
      res.send({
        message: "Users fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  });
  
//delete user
  router.post("/delete-user",authMiddleware,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success:true,
            message:"User deleted successfully"
        });
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
});



module.exports = router;