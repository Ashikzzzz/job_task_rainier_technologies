import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

// create user
router.post('/create-course', courseController.createCourse);

// get all course
router.get('/', courseController.getAllCourse);

export const courseRouter = router;
