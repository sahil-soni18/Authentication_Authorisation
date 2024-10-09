import express from 'express';
import isLoggedIn from '../middleware/isAuthenticated.middleware.js';
import User from '../db/User.model.js';
import Quote from '../db/Quote.model.js';
import "../db/Association.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
// import upload from '../middleware/multer.middleware.js';
// upload.single('profilePic'),

import cors from 'cors';
import sequelize from '../db/config.js';


let salt = bcrypt.genSaltSync(10);
console.log(`Salt is: ${salt}...`);

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // or your front-end URL
    credentials: true // Allow credentials (cookies)
}));

app.use(cookieParser());
app.use(express.json()); // Add this middleware

sequelize.sync({ alter: true });


// Modify your root route to send the user's profile picture or a login status
app.get("/", isLoggedIn, async (req, res) => {
    // isLoggedIn middleware verifies the JWT and sets req.user
    const user = await User.findOne({ where: { email: req.user.email } });
    console.log(`user = ${JSON.stringify(user.toJSON())}`);
    
    if (user) {
        return res.status(200).json({
            loggedIn: true,
            // profilePic: user.profilepic,
            name: user.name,
            _id: user._id
        });
    } else {
        return res.status(401).json({ loggedIn: false });
    }
});



app.post("/signup",  async (req, res) => {
    const { name, email, password } = req.body;
    // const filePath = "";
    // if (req.file && req.file.path) {
    //     filePath = req.file.path;
    // } 
    
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required!");
    }

    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    
    if (user) {
        return res.status(400).send("Email already registered...");
    }

    // Hash the password
    let hash = bcrypt.hashSync(password, salt);
    
    // Generate JWT token
    let token = jwt.sign({ email: email }, "ThisisSecretKey");
    

    // Set auth_token in cookie
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false, // Set to true in production when using HTTPS
        sameSite: 'None', // Allow cross-origin cookies
        // Note: You might need to adjust the `SameSite` value
    });
    console.log("Cookie set:", req.cookies);



    // Create and save the new user
   await User.create({
        name: name,
        email: email,
        password: hash,
        // profilepic: filePath,
        auth_token: token
    });

    return res.status(200).send("User registered successfully!");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email,
        }
    });

    if (user) {
        let isCorrect = bcrypt.compareSync(password, user.password);
        if (isCorrect) {
            let token = jwt.sign({ email: email }, "ThisisSecretKey");

            // Set auth_token in cookie
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true, // Set to true for cross-site cookies
                sameSite: 'None', // Consider using Strict or Lax in development
            });
            console.log(`Token = ${token}...`);
            console.log("Cookie set:", req.cookies);

            res.status(200).send("Verified...");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } else {
        res.status(404).send("User not found");
    }
});


// app.get("/getProfile", isLoggedIn,  async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({
//         where: {
//             email: email
//         }
//     });

//     return res.status(200).send(user.profilepic);
// });


app.post("/logout", (req, res) => {
    // Clear the auth_token cookie
    // res.clearCookie("auth_token", {
    //     httpOnly: true,
    //     secure: false, // Set to true in production when using HTTPS
    //     sameSite: 'None', // Adjust as necessary
    // });
    res.cookie('auth_token', '', { expires: new Date(0) });
    console.log("Logging out...")
    res.status(200).send("Logged out successfully");
});

app.get ("/quotes", isLoggedIn, async (req, res) => {
   let QuoteData =  await Quote.findAll();
   console.log(`Quote Data: ${QuoteData}..`)
   res.json(QuoteData);

});

app.post("/addQuote", isLoggedIn, async (req, res) => {
    const { quote, author } = req.body;

    try {
        await Quote.create({
            quote: quote,
            author: author,
        })
    } catch (error) {
        
    }

    
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})

export default app;