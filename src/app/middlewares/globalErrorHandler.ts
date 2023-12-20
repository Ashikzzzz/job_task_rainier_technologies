/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';

// import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
import ApiError from '../../errors/ApiError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('global error handler', error)
    : console.log('global error handler', error);

  let statusCode = 500;
  let message = 'Something went Wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  // checking validtion error
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage);
  }

  //checking mongoose cast error
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage);
  }

  // checking zod error
  else if (error instanceof ZodError) {
    console.log('ZodError', error);
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }

  // checking custom error
  else if (error instanceof ApiError) {
    (statusCode = error?.statusCode),
      (message = error.message),
      (errorMessage = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : []);
  } else if (error instanceof Error) {
    (message = error.message),
      (errorMessage = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : []);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env != 'production' ? error?.stack : undefined,
  });

  // next();
};

export default globalErrorHandler;
