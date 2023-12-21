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

// get a single course
const getSingleCourseData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await courseService.getSingleCourseData(id);

  responseForData.sendResponseForCreate<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Getting Successful',
    data: result,
  });
});

// delete course

const deleteTravelData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await courseService.deleteCourseData(id);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Delete Successful',
    data: result,
  });
});

// update course
const updateCourseData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const travelData = req.body;
  const result = await courseService.updateCourseData(id, travelData);

  responseForData.sendResponseForCreate<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course data Update Successful',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourseData,
  deleteTravelData,
  updateCourseData,
};
