import mongoose from "mongoose";

let dbPath = process.env.mongoDB || "mongodb://127.0.0.1:27017/fooder";

//To connect mock database for testing purposes
if (process.env.NODE_ENV === 'test') {
    dbPath = `${dbPath}Test`;
}
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