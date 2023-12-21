import { Model } from 'mongoose';

export type ICourse = {
  name: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  topics: string[];
  schedule: ICourseSchedule;
};

type ICourseSchedule = {
  startDate: Date;
  endDate: Date;
  classDays: string[];
  classTime: string;
};

export type ICourseFilters = {
  searchTerm?: string;
};

export type CourseModel = Model<ICourse, Record<string, unknown>>;
