import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    fullName: {
        require: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    avatarUrl: String,
   
    },
{timestamps: true}
)

export default mongoose.model('User',userScheme)