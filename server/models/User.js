import mongoose from "mongoose";
import { isEmailValid } from "../utils/regExp.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (email) => isEmailValid(email),
                message: "Invalid email address"
            }
        },

        password: {
            type: String,
            required: true
        },

        tokenVersion: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);