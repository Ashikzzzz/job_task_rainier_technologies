import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { courseService } from './course.service';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const courseData = req.body;
  const result = await courseService.createCourse(courseData);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The course has been added successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
};
