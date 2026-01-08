import mongoose, { Schema, Model } from 'mongoose';

export interface IService {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  image?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a service name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a service description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: [
        'Screen Repair',
        'Battery Replacement',
        'Water Damage',
        'Software Issues',
        'Hardware Repair',
        'Phone Cleaning',
        'Charging Port Repair',
        'Other',
      ],
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
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

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
