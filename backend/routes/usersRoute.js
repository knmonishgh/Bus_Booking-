const router = require('express').Router();
const User = require("../models/usersmodel")
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');


passport.use(new GoogleStrategy({
    clientID:'513067274332-u7udvva91ic52gmqlaoei9pt2ppom80p.apps.googleusercontent.com ',
    clientSecret: "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" ,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // find or create user in your database
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          // you can add more user info from the profile object
        });
        await newUser.save();
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // deserialize user object from session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  const authenticateUser = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  }

  const handleGoogleCallback = async (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, async () => {
      try {
        // create JWT token for the user
        const token = jwt.sign({ userId: req.user._id }, "test", {
          expiresIn: "1d"
        });
        // set the JWT token as a cookie in the response
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/');
      } catch (error) {
        next(error);
      }
    });
  }

  router.get('/auth/google', authenticateUser);
router.get('/auth/google/callback', handleGoogleCallback);


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
            expiresIn: "1d"
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





module.exports = router;
