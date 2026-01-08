# Lashari Mobile Zone - Professional Mobile Repair Shop Website

A complete, production-ready Next.js website for Lashari Mobile Zone mobile repairing shop featuring a modern frontend and powerful admin panel.

## 🌟 Features

### Public Website
- **Modern Homepage** with hero section, featured services, testimonials, and CTAs
- **Services Page** with search, filter, and categorization
- **About Us Page** showcasing company information and team
- **Contact Page** with:
  - Contact form submission
  - Google Maps integration
  - WhatsApp chat button
  - WhatsApp channel link
  - Click-to-call functionality
  - Email integration
  - Business hours display
- **Fully Responsive Design** for mobile, tablet, and desktop
- **WhatsApp Floating Button** on all pages
- **SEO-Optimized** structure

### Admin Panel
- **Secure Authentication** with JWT-based login
- **Dashboard** with statistics and quick actions
- **Service Management**:
  - Add, edit, and delete services
  - Set featured services
  - Manage pricing and categories
- **Inquiry Management**:
  - View all customer inquiries
  - Mark as read/unread
  - Delete inquiries
  - Quick contact options (WhatsApp, Email, Call)
- **Settings Management**:
  - Update business information
  - Change contact details
  - Modify WhatsApp and Google Maps links

## 🚀 Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: React Icons
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ismail1320/Lashari-mobile-zone.git
cd Lashari-mobile-zone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/lashari-mobile-zone
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lashari-mobile-zone

# JWT Secret (Change in production!)
JWT_SECRET=your-secure-random-secret-key

# Admin Credentials (Default - Change after first login)
ADMIN_EMAIL=admin@lasharimobile.com
ADMIN_PASSWORD=admin123

# Business Information
BUSINESS_NAME=Lashari Mobile Zone
BUSINESS_PHONE=03445979016
BUSINESS_EMAIL=ik4937444@gmail.com
WHATSAPP_NUMBER=03445979016
WHATSAPP_CHANNEL=https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g
GOOGLE_MAPS_LINK=https://maps.app.goo.gl/oEkYqEHkykhbRshn7
BUSINESS_ADDRESS=Lashari Mobile Zone, Main Market
BUSINESS_HOURS=10:00 AM to 10:00 PM (Daily)

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Initialize Database

Start your development server and visit the initialization endpoint:

```bash
npm run dev
```

Then open your browser and go to:
```
http://localhost:3000/api/auth/init
```

This will:
- Create the admin account
- Populate sample services
- Add sample testimonials
- Initialize settings

### 5. Access the Website

- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

**Default Admin Credentials:**
- Email: `admin@lasharimobile.com`
- Password: `admin123`

⚠️ **Important**: Change the admin password immediately after first login!

## 📱 Contact Information

The website comes pre-configured with Lashari Mobile Zone's contact information:

- **Phone**: 03445979016
- **WhatsApp**: 03445979016
- **WhatsApp Channel**: https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g
- **Email**: ik4937444@gmail.com
- **Business Hours**: 10:00 AM to 10:00 PM (Daily)
- **Google Maps**: https://maps.app.goo.gl/oEkYqEHkykhbRshn7

## 📦 Sample Data

The system comes with pre-loaded sample data:

### Services (10 services including):
- Screen Repair & Replacement
- Battery Replacement
- Water Damage Repair
- Software Issues & Updates
- Charging Port Repair
- Camera Repair & Replacement
- And more...

### Testimonials (7 customer reviews)
All with 4-5 star ratings from satisfied customers

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: { ... },    // Blue shades
  secondary: { ... },  // Orange shades
  success: { ... },    // Green shades
}
```

### Adding New Service Categories

1. Update the category enum in `models/Service.ts`
2. Add the category to the filter options in `app/services/page.tsx`
3. Update the admin form in `app/admin/services/page.tsx`

### Modifying Layout

- Header/Navbar: `components/layout/Navbar.tsx`
- Footer: `components/layout/Footer.tsx`
- Admin Layout: `components/admin/AdminLayout.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS
- DigitalOcean

### Production Checklist

- [ ] Change JWT_SECRET to a secure random string
- [ ] Update admin credentials
- [ ] Configure MongoDB Atlas for production
- [ ] Update NEXT_PUBLIC_SITE_URL
- [ ] Test all contact forms
- [ ] Verify Google Maps integration
- [ ] Test WhatsApp links
- [ ] Enable HTTPS/SSL
- [ ] Test responsive design on real devices

## 📖 API Routes

### Public Endpoints
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/inquiries` - Submit inquiry
- `GET /api/testimonials` - Get testimonials
- `GET /api/settings` - Get business settings

### Protected Endpoints (Require Authentication)
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/inquiries` - Get all inquiries
- `PATCH /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry
- `PUT /api/settings` - Update settings

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify authentication
- `GET /api/auth/init` - Initialize database

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- CSRF protection
- Input validation
- MongoDB injection prevention
- Secure environment variables

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Port Already in Use

```bash
# Change the port in package.json
"dev": "next dev -p 3001"
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📞 Support

For any issues or questions:
- Email: ik4937444@gmail.com
- WhatsApp: 03445979016

## 📄 License

ISC License - Free to use and modify

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

**Lashari Mobile Zone** - Professional Mobile Repair Services
Website built with ❤️ using Next.js
