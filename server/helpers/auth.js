import jwt from "jsonwebtoken";

//Check .env folder and set the secrets if exists
const accessTokenSecret = process.env.accessTokenSecret || 'AccessTokenScret';
const refreshTokenSecret = process.env.refreshTokenSecret || 'RefreshTokenScret';

//Create an access token
export const createAccessToken = ({ userId = '' }) => {
    try {
        return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15s" });
    } catch (error) {
        console.log(error);
        throw Error('internalServerError');
    }

};

//Create a refresh token
export const createRefreshToken = ({ userId = '', version = '' }) => {
    try {
        return jwt.sign({ userId, version }, refreshTokenSecret, { expiresIn: "1y" });
    } catch (error) {
        console.log(error);
        throw Error('internalServerError');
    }

};

//Set token as cookie
export const setRefreshToken = ({ res = {}, token = '' }) => {
    res.cookie('rid', token, {
        httpOnly: true,
        path: '/refresh_token'
    });
};

//Verify access token
export const verifyAccessToken = ({ token = '' }) => {
    try {
        const payload = jwt.verify(token.split(' ')[1], accessTokenSecret);
        return payload.userId;
    } catch (error) {
        throw error;
    }
};

//Verify refresh token
export const verifyRefreshToken = ({ token = '' }) => {
    try {
        const payload = jwt.verify(token, refreshTokenSecret);
        return { userId: payload.userId, version: payload.version };
    } catch (error) {
        throw error;
    }
}