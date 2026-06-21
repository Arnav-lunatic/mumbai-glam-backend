import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    googleId: {
        type: String,
        unique: true
    },

    name: String,

    email: {
        type: String,
        unique: true
    },

    avatar: String

});

export default mongoose.model("User", userSchema);