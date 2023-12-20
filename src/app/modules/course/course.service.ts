import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse) => {
  const isExist = await Course.findOne({ name: payload.name });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course is Already exists');
  }
  const result = await Course.create(payload);

  return result;
};

export const courseService = {
  createCourse,
};
