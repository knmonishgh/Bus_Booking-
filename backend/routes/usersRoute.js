const router = require('express').Router();
const User = require("../models/usersmodel")
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

router.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
        if (existingUser) {
            if (existingUser.email === req.body.email) {
                return res.send({
                    message: "User with this email already exists",
                    success: false,
                    data: null
                });
            } else if (existingUser.phone === req.body.phone) {
                return res.send({
                    message: "User with this phone number already exists",
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
            message: "user created succesfully",
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
            expiresIn: "1h"
        });

        res.send({
            message: "User Logged in successfully",
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