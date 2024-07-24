import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const signup = async(req,res) => {
    try {
        const {email, username, password} = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid Email format"})
        }

        if(password.length < 6) {
            return res.status(400).json({success: false, message: "Password must be atleast 6 characters long"})
        }

        const existingUsername = await User.findOne({username: username});
        if(existingUsername) {
            return res.status(400).json({success: false, message: "Username already exists"})
        }

        const existingEmail = await User.findOne({email: email});
        if(existingEmail) {
            return res.status(400).json({success: false, message: "Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            image
        })

        await newUser.save();

        return res.status(201).json({success: true,user: {
            ...newUser._doc,
            password: ""
        }})
    } catch (error) {
        console.log("Error in Signup controller :" + error.message);
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
};

export const login = async(req,res) => {
    res.send("Login Route")
};

export const logout = async(req,res) => {
    res.send("Logout Route")
};
