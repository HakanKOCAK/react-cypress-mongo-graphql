import User from "../models/User.js";
import lodash from "lodash";

export const createUser = ({ name = '', surname = '', email = '', password = '' }) => new User({ name, surname, email, password });

export const getUserByEmail = async ({ email = '' }) => {
    try {
        const users = await User.find({ email });

        if (lodash.isEmpty(users)) {
            throw new Error('invalidCredentials');
        }

        return users[0];
    } catch (error) {
        throw error;
    }
};

export const getUserById = async ({ userId = '' }) => {
    try {
        const user = await User.findById(userId);

        if (lodash.isEmpty(user)) {
            throw new Error('userDoesNotExist');
        }

        return user;
    } catch (error) {
        throw error;
    }
};
