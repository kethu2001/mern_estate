import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'API route is working'
    });
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "you can only update your own account"))
    try {
        //encrypt the password
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        //update the user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true}) //return and save updated user for the with new information

        const {password, ...rest} = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "you can only delete your own account"))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}