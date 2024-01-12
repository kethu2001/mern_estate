import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fempty-profile-picture&psig=AOvVaw1aypFv_hkXEGzVkuN2xRR-&ust=1705148579140000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLi72dDr14MDFQAAAAAdAAAAABAD"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;