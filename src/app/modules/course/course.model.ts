import { Schema, model } from 'mongoose';

import { CourseModel, ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
    schedule: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      classDays: {
        type: [String],
        required: true,
      },
      classTime: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<ICourse, CourseModel>('User', courseSchema);
