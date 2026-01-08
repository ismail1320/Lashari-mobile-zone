import mongoose, { Schema, Model } from 'mongoose';

export interface IInquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    serviceType: {
      type: String,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
