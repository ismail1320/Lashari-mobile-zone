import mongoose, { Schema, Model } from 'mongoose';

export interface ITestimonial {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    service: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
