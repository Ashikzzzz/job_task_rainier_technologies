import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// import config from '../config';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  option: Record<string, unknown>,
): string => {
  return jwt.sign(payload, secret, option);
};

const verifyToken = async (
  token: string,
  secret: Secret,
): Promise<jwt.JwtPayload> => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtToken = {
  createToken,
  verifyToken,
};
