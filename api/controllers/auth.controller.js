import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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