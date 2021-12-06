import mongoose from "mongoose";

const dbPath = process.env.mongoDB || "mongodb://127.0.0.1:27017/fooder"
const connectDB = async () => {
    try {
        await mongoose.connect(dbPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        throw error;
    }
};

export default connectDB;