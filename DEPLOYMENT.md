# ThePartybox - Deployment & Hosting Guide

## Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- SQLite3 (included with server)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
# Server will run on http://localhost:3000
```

Or for development with auto-reload:
```bash
npm run dev
```

3. **Access the application:**
   - Website: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Database

The application uses **SQLite3** for local data storage:
- **Location**: `data/quotes.db`
- **Tables**: 
  - `quotes` - Customer quote requests
  - `pageVisits` - Visitor tracking
  - `galleryInteractions` - Gallery view tracking

All data is automatically persisted in the `data/` directory.

## API Endpoints

### Quote Submission
- **POST** `/api/quotes` - Submit a new quote request
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01708898374",
    "eventDate": "2024-12-25",
    "eventType": "birthday",
    "details": "Looking for balloon arch..."
  }
  ```

### Admin APIs
- **GET** `/api/admin/quotes` - Get all quotes
- **GET** `/api/admin/quotes/:status` - Get quotes by status (new, contacted, quoted, completed)
- **PUT** `/api/admin/quotes/:id` - Update quote status
- **GET** `/api/admin/analytics` - Get analytics data

### Tracking APIs
- **POST** `/api/tracking/pagevisit` - Track page visits (auto-called)
- **POST** `/api/tracking/gallery` - Track gallery interactions (auto-called)

## Hosting Options

### Option 1: Vercel (Recommended - Free Tier)

1. **Create Vercel account**: https://vercel.com/signup
2. **Push code to GitHub**
3. **Connect repository to Vercel**
4. **Deploy** (automatic)

**Note**: Vercel's serverless functions have SQLite limitations. For production with persistent data, add a cloud database like:
- Supabase PostgreSQL
- MongoDB Atlas
- PlanetScale MySQL

### Option 2: Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**: `heroku login`
3. **Create app**: `heroku create thepartybox`
4. **Deploy**: 
   ```bash
   git push heroku main
   ```

**Procfile** (already configured):
```
web: npm start
```

### Option 3: Railway.app (Simple & Free)

1. **Sign up**: https://railway.app
2. **Connect GitHub repo**
3. **Set environment variables** in Railway dashboard
4. **Deploy automatically**

Railway provides free tier with 500 hours/month - perfect for this application.

### Option 4: Self-Hosted (VPS)

Using DigitalOcean, Linode, or AWS:

1. **SSH into server**
2. **Install Node.js**:
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/ThePartybox.git
   cd ThePartybox
   npm install
   ```

4. **Use PM2 for process management**:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "thepartybox"
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name thepartybox.com www.thepartybox.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Setup SSL with Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d thepartybox.com -d www.thepartybox.com
   ```

## Database Migration to Cloud

For production deployment with persistent data:

### Using Supabase (PostgreSQL):

1. **Create Supabase project**: https://supabase.com
2. **Update server.js** to use PostgreSQL instead of SQLite:
```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
```

3. **Add to .env**:
```
DATABASE_URL=postgresql://...
```

## Environment Variables

Create `.env` file with:
```
PORT=3000
NODE_ENV=production
DATABASE_URL=your_database_url  # For cloud deployments
```

## Monitoring & Analytics

### Check Server Status
```bash
curl http://localhost:3000/api/health
```

### View Quotes in Admin Dashboard
- Navigate to `/admin` on your deployed site
- All quotes automatically saved to database
- Real-time analytics and filtering

## Backup & Data Export

### Export quotes to CSV:
```bash
sqlite3 data/quotes.db ".mode csv" ".output quotes.csv" "SELECT * FROM quotes;"
```

### Backup database:
```bash
cp data/quotes.db data/quotes.db.backup
```

## Performance Optimization

1. **Enable compression** - Already configured in Express
2. **CDN for static assets** - Use Vercel/Netlify CDN
3. **Database indexing** - Add indexes for large datasets
4. **Caching** - Implement Redis for session caching

## Troubleshooting

### Port already in use:
```bash
kill -9 $(lsof -ti:3000)
```

### Database locked:
```bash
rm data/quotes.db
npm start  # Will recreate fresh database
```

### Module not found:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Support

For issues or questions:
1. Check server logs: `pm2 logs thepartybox`
2. Verify database: `sqlite3 data/quotes.db ".tables"`
3. Test API: `curl http://localhost:3000/api/health`

## Next Steps

- [ ] Setup custom domain (thepartybox.com)
- [ ] Configure email notifications for new quotes
- [ ] Add SMS notifications (Twilio)
- [ ] Setup automated backups
- [ ] Configure analytics tracking (Google Analytics)
- [ ] Add customer review system
- [ ] Implement payment processing (Stripe)

---

**Your website is now fully functional with backend support!** 🎈
