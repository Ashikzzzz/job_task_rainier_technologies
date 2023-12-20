import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import bcrypt from 'bcrypt';
import { jwtToken } from '../../../shared/jwtToken';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

// login user

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // check user existance
  const isUserExist = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1 },
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  //check matched password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password,
  );

  // check password
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password isn't matched");
  }

  const { email: userEmail, role } = isUserExist;

  // create access token
  const accessToken = jwtToken.createToken(
    { userEmail, role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in as string },
  );

  // create refresh token
  const refreshToken = jwtToken.createToken(
    { userEmail, role },
    config.jwt_refresh_token as Secret,
    { expiresIn: config.jwt_refresh_expires_in as string },
  );

  return {
    accessToken,
    refreshToken,
  };
};

// refresh token

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verfiy token

  let verifyToken = null;
  try {
    verifyToken = await jwtToken.verifyToken(
      token,
      config.jwt_refresh_token as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  // checking deleted user refresh token

  const userEmail = verifyToken?.userEmail;

  //   check user existance

  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // generate new token

  const newAccessToken = await jwtToken.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in },
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
