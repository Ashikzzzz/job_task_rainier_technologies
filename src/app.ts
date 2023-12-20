import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
const app: Application = express();
import cookieParser from 'cookie-parser';

app.use(cors());

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if not found any route or api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessage: [
      {
        path: '.',
        message: 'Api Is not found',
      },
    ],
  });
  next();
});

export default app;
