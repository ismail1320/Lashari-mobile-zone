# Deployment Guide - Lashari Mobile Zone

This guide will help you deploy the Lashari Mobile Zone website to production.

## Quick Start for Vercel Deployment

### 1. Prerequisites
- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas account (free tier works)

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel deployment
5. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lashari-mobile-zone
   ```

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial commit - Lashari Mobile Zone website"
git push origin main
```

### 4. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lashari-mobile-zone
JWT_SECRET=your-random-secure-secret-key-here
ADMIN_EMAIL=admin@lasharimobile.com
ADMIN_PASSWORD=admin123
BUSINESS_NAME=Lashari Mobile Zone
BUSINESS_PHONE=03445979016
BUSINESS_EMAIL=ik4937444@gmail.com
WHATSAPP_NUMBER=03445979016
WHATSAPP_CHANNEL=https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g
GOOGLE_MAPS_LINK=https://maps.app.goo.gl/oEkYqEHkykhbRshn7
BUSINESS_ADDRESS=Lashari Mobile Zone, Main Market
BUSINESS_HOURS=10:00 AM to 10:00 PM (Daily)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

5. Click "Deploy"
6. Wait for deployment to complete

### 5. Initialize Database

After deployment, visit:
```
https://your-domain.vercel.app/api/auth/init
```

This will:
- Create admin account
- Add sample services
- Add sample testimonials
- Initialize settings

### 6. Login to Admin Panel

1. Go to: `https://your-domain.vercel.app/admin`
2. Login with:
   - Email: `admin@lasharimobile.com`
   - Password: `admin123`
3. **IMPORTANT**: Change the password immediately!

### 7. Customize Your Website

1. Go to Admin → Settings
2. Update all business information
3. Update contact details
4. Verify WhatsApp and Google Maps links

## Custom Domain Setup

### Vercel Custom Domain

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### Update Environment Variables

After setting up custom domain, update:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Alternative Deployment Options

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

4. Configure environment variables in Netlify dashboard

### Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add MongoDB plugin (or use external MongoDB)
4. Configure environment variables
5. Deploy automatically

### Deploy to DigitalOcean App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create new app from GitHub
3. Configure build command: `npm run build`
4. Configure run command: `npm start`
5. Add environment variables
6. Deploy

## Production Checklist

Before going live, ensure:

- [ ] MongoDB Atlas is configured with proper security
- [ ] JWT_SECRET is a strong random string (use: `openssl rand -base64 32`)
- [ ] Admin password is changed from default
- [ ] All business information is updated
- [ ] WhatsApp number is verified and working
- [ ] Google Maps link shows correct location
- [ ] Email is working for contact form
- [ ] Test all contact methods (phone, WhatsApp, email)
- [ ] Test all admin features
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] SSL/HTTPS is enabled
- [ ] Custom domain (if applicable) is configured
- [ ] Analytics (Google Analytics, etc.) added if needed

## Performance Optimization

### Enable Caching

The website is already optimized with:
- Static page generation where possible
- Image optimization
- Code splitting
- Lazy loading

### Monitor Performance

Use these tools:
- Google PageSpeed Insights
- Vercel Analytics
- Google Search Console

## Backup Strategy

### Database Backups

MongoDB Atlas provides automated backups. Configure:
1. Go to MongoDB Atlas cluster
2. Click "Backup"
3. Enable continuous backup
4. Set retention period

### Code Backups

Maintain code backups:
- Keep GitHub repository updated
- Use version control for all changes
- Tag releases for production versions

## Troubleshooting

### Database Connection Issues

If you see "Database connection failed":
1. Check MongoDB Atlas whitelist includes 0.0.0.0/0
2. Verify MONGODB_URI is correct
3. Check database user has proper permissions

### Build Failures

If build fails on Vercel:
1. Check build logs
2. Verify all environment variables are set
3. Test build locally: `npm run build`

### Admin Login Not Working

1. Ensure `/api/auth/init` was called
2. Verify JWT_SECRET is set
3. Check browser cookies are enabled

## Support & Maintenance

### Regular Maintenance Tasks

1. **Weekly**:
   - Check inquiries in admin panel
   - Respond to customer messages
   - Review testimonials

2. **Monthly**:
   - Update services and pricing
   - Check website performance
   - Review analytics
   - Update content

3. **Quarterly**:
   - Update dependencies: `npm update`
   - Security audit: `npm audit`
   - Backup database
   - Review SEO performance

### Getting Help

For issues or questions:
- Email: ik4937444@gmail.com
- WhatsApp: 03445979016

## Security Best Practices

1. **Never commit**:
   - `.env.local` file
   - API keys
   - Passwords
   - MongoDB credentials

2. **Regular updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Update Node.js version

3. **Admin security**:
   - Use strong passwords
   - Change default credentials
   - Enable 2FA on Vercel/hosting
   - Limit admin access

## Monitoring

### Setup Monitoring

Recommended tools:
- **Uptime Monitoring**: UptimeRobot (free)
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics
- **Performance**: Vercel Analytics

### Health Check Endpoint

The website includes health check at:
```
https://your-domain.com/api/auth/verify
```

## Scaling

As your business grows:

1. **Database**:
   - Upgrade MongoDB Atlas tier
   - Enable sharding if needed
   - Add read replicas

2. **Hosting**:
   - Upgrade Vercel plan for more bandwidth
   - Enable CDN for static assets
   - Use edge caching

3. **Features**:
   - Add payment integration
   - Implement booking system
   - Add customer portal
   - Integrate SMS notifications

---

**Congratulations!** Your Lashari Mobile Zone website is now live! 🎉

For updates and support, contact: ik4937444@gmail.com
