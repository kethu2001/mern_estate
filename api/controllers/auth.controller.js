import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    //hash password
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User ({ username, email, password: hashedPassword });
    try {
        //saving to database
        await newUser.save()
        res.status(201).json("User created successfully") //201, which means something is created
    } catch (error) {
        //send error to the user
        // res.status(500).json(error.message);
        next(error);
        //next(errorHandler(550, 'error from the function'))
    }
    
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check the email is existed or not
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        //check the password with 'decrypted JS method' because password inside the database is a hash password
        //validate the password using compareSync method
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        //generate token and save it in cookie
        const token = Jwt.sign({ id: validUser._id}, process.env.JWT_SECRET) //create token
        const { password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest) //set-cookie
    } catch (error) {
        next(error);
    }
    
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.email })
        if (user) {
            //if user already exists then just create a token
            const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }else{
            //generate password
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); //36 means numbers from 0 to 9 and letters from A to Z
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User ({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
            await newUser.save();
            const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res,next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error)
    }
}