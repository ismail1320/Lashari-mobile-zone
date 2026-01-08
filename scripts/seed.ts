import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '@/models/Admin'
import Service from '@/models/Service'
import Testimonial from '@/models/Testimonial'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lashari-mobile-zone'

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Admin.deleteMany({})
    await Service.deleteMany({})
    await Testimonial.deleteMany({})
    console.log('Cleared existing data')

    // Create default admin
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const admin = new Admin({
      email: 'admin@lasharimobilezone.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    })
    await admin.save()
    console.log('Created default admin user')

    // Create sample services
    const sampleServices = [
      {
        name: 'Screen Replacement',
        description: 'Professional screen replacement for all phone models using high-quality original or premium compatible parts.',
        price: 1500,
        category: 'Screen Repair',
        icon: 'Monitor',
        duration: '1-2 hours',
        isActive: true,
        order: 1
      },
      {
        name: 'Battery Replacement',
        description: 'Replace your phone battery with a high-capacity original battery that comes with warranty.',
        price: 800,
        category: 'Battery Replacement',
        icon: 'Battery',
        duration: '30 minutes',
        isActive: true,
        order: 2
      },
      {
        name: 'Water Damage Repair',
        description: 'Expert water damage repair and recovery service. We use professional techniques to save your device.',
        price: 2000,
        category: 'Water Damage',
        icon: 'Droplets',
        duration: '2-3 days',
        isActive: true,
        order: 3
      },
      {
        name: 'Software Issues Fix',
        description: 'OS installation, malware removal, software updates, and troubleshooting all software-related problems.',
        price: 500,
        category: 'Software Issues',
        icon: 'Settings',
        duration: '1 hour',
        isActive: true,
        order: 4
      },
      {
        name: 'Hardware Repair',
        description: 'Complete hardware diagnosis and repair including motherboard, circuits, and internal components.',
        price: 1000,
        category: 'Hardware Repair',
        icon: 'Wrench',
        duration: '2-4 hours',
        isActive: true,
        order: 5
      },
      {
        name: 'Charging Port Repair',
        description: 'Charging port cleaning, repair, and replacement for all types of charging issues.',
        price: 600,
        category: 'Charging Port Repair',
        icon: 'Zap',
        duration: '1 hour',
        isActive: true,
        order: 6
      },
      {
        name: 'Camera Repair',
        description: 'Front and rear camera repair and replacement for blurry, damaged, or non-functioning cameras.',
        price: 1200,
        category: 'Camera Repair',
        icon: 'Camera',
        duration: '1-2 hours',
        isActive: true,
        order: 7
      },
      {
        name: 'Speaker/Microphone Repair',
        description: 'Fix audio issues with speaker and microphone replacement and repair services.',
        price: 700,
        category: 'Speaker/Microphone',
        icon: 'Headphones',
        duration: '1 hour',
        isActive: true,
        order: 8
      },
      {
        name: 'Power Button Repair',
        description: 'Power button replacement and repair for stuck, broken, or unresponsive power buttons.',
        price: 500,
        category: 'Power Button Repair',
        icon: 'Power',
        duration: '1 hour',
        isActive: true,
        order: 9
      },
      {
        name: 'Phone Cleaning Service',
        description: 'Professional cleaning service to remove dust, dirt, and debris from your phone.',
        price: 300,
        category: 'Phone Cleaning',
        icon: 'Zap',
        duration: '30 minutes',
        isActive: true,
        order: 10
      }
    ]

    const services = await Service.insertMany(sampleServices)
    console.log(`Created ${services.length} sample services`)

    // Create sample testimonials
    const sampleTestimonials = [
      {
        name: 'Ahmad Khan',
        review: 'Excellent service! My phone screen was replaced perfectly within 2 hours. Very professional staff and reasonable pricing. Highly recommended!',
        rating: 5,
        service: 'Screen Repair',
        date: new Date('2024-01-15'),
        isActive: true,
        order: 1
      },
      {
        name: 'Fatima Ali',
        review: 'Best mobile repair shop in the area. They saved my water-damaged phone that I thought was completely gone. Amazing work and great customer service.',
        rating: 5,
        service: 'Water Damage Repair',
        date: new Date('2024-01-10'),
        isActive: true,
        order: 2
      },
      {
        name: 'Hassan Raza',
        review: 'Quick and affordable battery replacement. The new battery lasts all day just like when the phone was new. Great experience overall.',
        rating: 5,
        service: 'Battery Replacement',
        date: new Date('2024-01-08'),
        isActive: true,
        order: 3
      },
      {
        name: 'Ayesha Sheikh',
        review: 'Professional service with warranty. My phone works like new after software issues fix. They explained everything clearly.',
        rating: 5,
        service: 'Software Issues',
        date: new Date('2024-01-05'),
        isActive: true,
        order: 4
      },
      {
        name: 'Muhammad Iqbal',
        review: 'Very honest and reliable service. They diagnosed the problem correctly and fixed it at a fair price. Will definitely come back.',
        rating: 5,
        service: 'Hardware Repair',
        date: new Date('2024-01-03'),
        isActive: true,
        order: 5
      },
      {
        name: 'Zara Ahmed',
        review: 'Fast charging port repair! My phone was not charging properly and they fixed it in just 30 minutes. Excellent service.',
        rating: 5,
        service: 'Charging Port Repair',
        date: new Date('2024-01-01'),
        isActive: true,
        order: 6
      }
    ]

    const testimonials = await Testimonial.insertMany(sampleTestimonials)
    console.log(`Created ${testimonials.length} sample testimonials`)

    console.log('Database seeded successfully!')
    console.log('Default admin credentials:')
    console.log('Email: admin@lasharimobilezone.com')
    console.log('Password: admin123')

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run the seeding function
seedDatabase()