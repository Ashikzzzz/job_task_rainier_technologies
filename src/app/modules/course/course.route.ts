import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

// create user
router.post('/create-course', courseController.createCourse);

// get all course
router.get('/', courseController.getAllCourse);

// get a single course
router.get('/:id/get-single-course', courseController.getSingleCourseData);

// delete a course
router.delete('/:id/delete-course', courseController.deleteTravelData);

export const courseRouter = router;
