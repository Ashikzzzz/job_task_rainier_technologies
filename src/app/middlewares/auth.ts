import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { jwtToken } from '../../shared/jwtToken';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';

const auth =
  (...role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization; // get token
      console.log('token', token);
      // check token
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      let verifyToken = null;

      // verify token
      verifyToken = await jwtToken.verifyToken(
        token as string,
        config.jwt_secret as Secret,
      );

      req.user = verifyToken;

      // role guard
      if (role.length && !role.includes(verifyToken.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You have no access');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
