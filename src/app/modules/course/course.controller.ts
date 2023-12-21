import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { courseService } from './course.service';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { ICourse } from './course.interface';

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

// get all tour data
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'price', 'level']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await courseService.getAllCourse(filters, paginationOption);

  responseForData.sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

export const courseController = {
  createCourse,
  getAllCourse,
};
