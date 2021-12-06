import {
  verifyRefreshToken,
  createRefreshToken,
  createAccessToken,
  setRefreshToken
} from "./helpers/auth.js";
import { getUserById } from "./helpers/user.js";

const refreshToken = async (req, res) => {
  //Get the refresh token from cookies
  const token = req.cookies.rid;

  if (!token) {
    return res.send({ accessToken: '' });
  }

  let payload = { userId: '', version: -1 };

  //Verify token
  try {
    payload = verifyRefreshToken({ token });

    //token seems valid, get user now
    const user = await getUserById({ userId: payload.userId });

    //check if token version is valid
    if (user.tokenVersion !== payload.version) {
      throw new Error('invalidRefreshToken');
    }

    //set new refresh token
    const refreshToken = createRefreshToken({ userId: user.id, version: user.tokenVersion });
    setRefreshToken({ res, token: refreshToken });

    //create new access token
    const accessToken = createAccessToken({ userId: user.id });

    return res.send({ accessToken });
  } catch (error) {
    console.log(error);
    return res.send({ accessToken: '' });
  }


};

export default refreshToken;
