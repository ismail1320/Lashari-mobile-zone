import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Screen Repair',
      'Battery Replacement',
      'Water Damage',
      'Software Issues',
      'Hardware Repair',
      'Phone Cleaning',
      'Charging Port Repair',
      'Camera Repair',
      'Speaker/Microphone',
      'Power Button Repair',
      'Volume Button Repair',
      'Headphone Jack Repair',
      'Other'
    ],
  },
  icon: {
    type: String,
    default: 'Smartphone',
  },
  image: {
    type: String,
    default: '',
  },
  duration: {
    type: String,
    default: '1-2 hours',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

serviceSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Service || mongoose.model('Service', serviceSchema)