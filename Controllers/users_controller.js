const asyncHandler = require('express-async-handler');
const USER_SCHEMA =require('../Models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = asyncHandler(async(req, res) => {
    const data = await USER_SCHEMA.find();
    res.status(200).json({ data });
});

const createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, full_name, email, password, mobile, is_admin } = req.body;
    if(!username || !full_name || !email || !password || !mobile || !is_admin) {
        res.status(400);
        throw new Error("All Fields are Mandatory !");
    }
    const isUserAvailable =await USER_SCHEMA.findOne({ email });
    if(isUserAvailable) {
        res.status(400);
        throw new Error("User Already Registered, Pls Try Another User..!");
    } else {
        const hasPassword = await bcrypt.hash(password, 10);
        const newUser =await USER_SCHEMA.create({
            username, full_name, email, mobile, is_admin,
            password: hasPassword
        });
        if (newUser) {
            res.status(200).json({ message: "User Created Successfully.." });
        } else {
            res.status(400);
            throw new Error("Something went wrong ...");
        }
    }
});

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory !");
    }
    const isUserAvailable =await USER_SCHEMA.findOne({ email });
    if(isUserAvailable && (await bcrypt.compare(password, isUserAvailable.password))) {
        const auth_token = jwt.sign(
            {
                user: {
                    username: isUserAvailable.username,
                    email: isUserAvailable.email,
                    id: isUserAvailable.id
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "20m" }
        )
        res.status(200).json({ 
            message: 'User login successfully...',
            auth_token,
            user_info: isUserAvailable
        });
    } else {
        res.status(404);
        throw new Error("Email or Password Invalid..!");
    }
});

module.exports = { getAllUsers, createUser, loginUser };