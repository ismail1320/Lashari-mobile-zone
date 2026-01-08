# Lashari Mobile Zone - Complete Mobile Repair Website

A professional, production-ready website for Lashari Mobile Zone mobile repairing shop built with Next.js, React, Tailwind CSS, and MongoDB.

## 🚀 Features

### Public Website
- **Homepage**: Hero section with service highlights, testimonials, and quick contact CTAs
- **Services Page**: Complete catalog with search, filter, and category functionality
- **About Page**: Company information, team section, and why choose us
- **Contact Page**: Contact form, Google Maps integration, WhatsApp chat, and click-to-call

### Admin Panel
- **Dashboard**: Overview with statistics and recent inquiries
- **Service Management**: Add, edit, delete services with categories and pricing
- **Inquiry Management**: View, manage, and respond to customer inquiries
- **Settings**: Business information and admin credentials management

### Key Integrations
- **WhatsApp Integration**: Direct chat button and channel subscription
- **Google Maps**: Embedded map with directions
- **Phone Integration**: Click-to-call functionality
- **Email Integration**: Contact form with email notifications

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based admin authentication
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lashari-mobile-zone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lashari-mobile-zone
   JWT_SECRET=your-super-secret-jwt-key-here
   ADMIN_EMAIL=admin@lasharimobilezone.com
   ADMIN_PASSWORD=admin123
   NEXT_PUBLIC_PHONE_NUMBER=03445979016
   NEXT_PUBLIC_EMAIL=ik4937444@gmail.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=03445979016
   NEXT_PUBLIC_WHATSAPP_CHANNEL=https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g
   NEXT_PUBLIC_BUSINESS_HOURS=10:00 AM - 10:00 PM (Daily)
   NEXT_PUBLIC_GOOGLE_MAPS_URL=https://maps.app.goo.gl/oEkYqEHkykhbRshn7
   ```

4. **Set up the database**
   ```bash
   # Start MongoDB (if using local installation)
   mongod
   
   # Seed the database with sample data
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Default Admin Credentials

After seeding the database, you can log in to the admin panel with:
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@lasharimobilezone.com
- **Password**: admin123

## 📁 Project Structure

```
lashari-mobile-zone/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── services/        # Services management API
│   │   ├── inquiries/       # Customer inquiries API
│   │   └── testimonials/    # Testimonials API
│   ├── admin/              # Admin panel pages
│   ├── services/           # Services page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── Header.tsx         # Site header with navigation
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   └── auth.ts            # Authentication utilities
├── models/                # MongoDB models
│   ├── Admin.ts          # Admin user model
│   ├── Service.ts         # Service model
│   ├── Inquiry.ts         # Customer inquiry model
│   └── Testimonial.ts     # Customer testimonial model
├── scripts/               # Database seeding script
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# The connection string in .env.local should be:
MONGODB_URI=mongodb://localhost:27017/lashari-mobile-zone
```

#### MongoDB Atlas (Cloud)
```bash
# Create a cluster at https://cloud.mongodb.com
# Get connection string and update:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lashari-mobile-zone
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `ADMIN_EMAIL` | Default admin email | Yes |
| `ADMIN_PASSWORD` | Default admin password | Yes |
| `NEXT_PUBLIC_PHONE_NUMBER` | Business phone number | Yes |
| `NEXT_PUBLIC_EMAIL` | Business email | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number | Yes |
| `NEXT_PUBLIC_WHATSAPP_CHANNEL` | WhatsApp channel link | Yes |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Business hours | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | Google Maps location link | Yes |

## 🔧 Admin Panel Features

### Dashboard
- View total services, inquiries, and statistics
- See recent customer inquiries
- Quick access to all admin functions

### Services Management
- Add new repair services
- Edit existing services
- Set categories, pricing, and descriptions
- Activate/deactivate services
- Delete services

### Inquiry Management
- View all customer inquiries
- Mark inquiries as read/unread
- Update inquiry status
- Reply via email or WhatsApp
- Delete inquiries

### Settings
- Update business information
- Change admin password
- Manage contact details and hours

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#3b82f6) - Trust and professionalism
- **Secondary**: Orange (#f97316) - Energy and warmth
- **Accent**: Green (#22c55e) - Success and growth

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### Performance
- Fast loading times
- Optimized images
- Lazy loading
- SEO-friendly structure

## 📱 Contact Integration

### WhatsApp
- Direct chat button throughout the site
- WhatsApp channel subscription
- Instant messaging for customer support

### Phone
- Click-to-call functionality
- Mobile-optimized calling

### Email
- Contact form submissions
- Direct email links

### Maps
- Google Maps integration
- Directions and location info

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcryptjs
- CSRF protection
- Input validation and sanitization

## 📈 SEO Optimization

- Semantic HTML structure
- Meta tags and Open Graph
- Fast loading times
- Mobile-friendly design
- Clean URL structure

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env.local
   - Verify network access (for Atlas)

2. **Admin Login Issues**
   - Run `npm run seed` to create default admin
   - Check environment variables
   - Clear browser cookies

3. **Build Errors**
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors
   - Ensure all environment variables are set

4. **API Routes Not Working**
   - Check server logs for errors
   - Verify MongoDB connection
   - Check authentication middleware

## 📞 Support

For technical support or questions about the website:
- Email: ik4937444@gmail.com
- WhatsApp: 03445979016

## 📄 License

This project is proprietary software for Lashari Mobile Zone. All rights reserved.

---

**Built with ❤️ for Lashari Mobile Zone**

*Professional mobile repair services made accessible online*