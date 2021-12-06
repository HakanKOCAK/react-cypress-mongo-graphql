import { hash, verify } from "argon2";
import { createAccessToken, createRefreshToken, setRefreshToken, verifyAccessToken } from "../../helpers/auth.js";
import { createUser, getUserByEmail, getUserById } from "../../helpers/user.js";

const authResolver = {
    //Register User
    register: async ({ name, surname, email, password }, { _, res }) => {
        try {
            //Check password length 
            if (password.length < 6) {
                throw Error('minPasswordLengthIs6');
            }

            //Hash password
            const hashedPassword = await hash(password);

            //Create user
            const user = createUser({ name, surname, email, password: hashedPassword });

            //Save user to db
            await user.save();

            //Create tokens
            const accessToken = createAccessToken({ userId: user.id });
            const refreshToken = createRefreshToken({ userId: user.id, version: user.tokenVersion });

            //Set refresh token as cookie
            setRefreshToken({ res, token: refreshToken });

            //Response
            return ({
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                accessToken
            });
        } catch (error) {
            //Check if error is duplicate key.
            if (error.code === 11000) {
                throw Error('emailInUse');
            }
            throw error;
        }
    },

    //Login User
    login: async ({ email, password }, { _, res }) => {
        try {
            //Check if user registered
            const user = await getUserByEmail({ email });

            //Check if password is true
            const isVerified = await verify(user.password, password);

            if (!isVerified) {
                throw new Error('invalidCredentials');
            }

            //Create tokens
            const accessToken = createAccessToken({ userId: user.id });
            const refreshToken = createRefreshToken({ userId: user.id, version: user.tokenVersion });

            //Set refresh token as cookie
            setRefreshToken({ res, token: refreshToken });

            return ({
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                accessToken
            });
        } catch (error) {
            throw error;
        }
    },

    //Return logged in user
    me: async (_args, { req, _ }) => {
        const token = req.headers['authorization'];

        if (!token) return null;

        try {
            const userId = verifyAccessToken({ token });

            const user = await getUserById({ userId });

            return ({
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};

export default authResolver;
