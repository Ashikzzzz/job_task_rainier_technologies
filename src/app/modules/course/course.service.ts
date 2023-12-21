import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICourse, ICourseFilters } from './course.interface';
import { Course } from './course.model';
import { IPaginationOption } from '../../../shared/pagination';
import { IGenericResponse } from '../../../interfaces/common';

// create course
const createCourse = async (payload: ICourse) => {
  const isExist = await Course.findOne({ name: payload.name });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course is Already exists');
  }
  const result = await Course.create(payload);

  return result;
};

// get all course

const getAllCourse = async (
  filters: ICourseFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<ICourse[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const courseSearchFiled = ['name'];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: courseSearchFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andCconditions.length > 0 ? { $and: andCconditions } : {};

  // this is for pagination

  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;

  const result = await Course.find(whereConditions)
    .sort({
      createdAt: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await Course.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a single course by id
const getSingleCourseData = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id);
  return result;
};

export const courseService = {
  createCourse,
  getAllCourse,
  getSingleCourseData,
};
