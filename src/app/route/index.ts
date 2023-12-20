import express from 'express';
import { userRouter } from '../modules/user/user.route';
import { authRoute } from '../modules/auth/auth.route';
import { courseRouter } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/course',
    route: courseRouter,
  },
];

moduleRoutes.map(route => router.use(route.path, route.route));

export default router;
