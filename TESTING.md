# ThePartybox - Testing Guide

## ✅ Full System Test Checklist

### 1. **Website Frontend** (http://localhost:3000)

#### Hero Section
- [ ] Title and description visible
- [ ] "View Our Gallery" button works
- [ ] "Request a Custom Quote" button works
- [ ] Scroll animation triggers

#### Navigation
- [ ] Header sticky when scrolling
- [ ] Mobile menu toggle works (on small screens)
- [ ] Click-to-call button displays phone number
- [ ] Nav links scroll to sections

#### Gallery
- [ ] Gallery loads 12 sample images
- [ ] Filter buttons work (All, Birthdays, Weddings, Corporate)
- [ ] Click image opens lightbox
- [ ] Lightbox close button works
- [ ] ESC key closes lightbox
- [ ] Responsive grid adapts to screen size

#### Features & Services
- [ ] Feature cards display with hover effect
- [ ] Service cards display with hover effect
- [ ] Icons load properly

#### Testimonials
- [ ] Testimonial carousel auto-rotates (5s)
- [ ] Previous/Next buttons work
- [ ] Star ratings display

#### Contact Form
- [ ] All fields present (Name, Email, Phone, Date, Type, Details)
- [ ] Form validation works (required fields)
- [ ] Submit button sends data to backend
- [ ] Success message appears on submit
- [ ] Error message appears if validation fails
- [ ] Form resets after successful submit

#### Footer
- [ ] Business info displays
- [ ] Click-to-call link works
- [ ] Social media links present
- [ ] Copyright info visible

### 2. **Admin Dashboard** (http://localhost:3000/admin)

#### Dashboard Statistics
- [ ] Total Quotes card shows count
- [ ] New Quotes card shows count
- [ ] Page Visits card shows count
- [ ] Gallery Views card shows count

#### Analytics
- [ ] "Quotes by Status" chart displays
- [ ] "Quotes by Event Type" chart displays
- [ ] Charts update after new submission

#### Quote Management
- [ ] Filter buttons work (All, New, Contacted, Quoted, Completed)
- [ ] Quote list displays all submissions
- [ ] Click "View" button opens quote modal
- [ ] Modal shows all quote details
- [ ] Status dropdown works in modal
- [ ] Update Status button saves changes
- [ ] Quote status updates in table
- [ ] Refresh button fetches latest data

#### Real-time Updates
- [ ] Submit new quote on website
- [ ] Check admin dashboard
- [ ] New quote appears in list
- [ ] Analytics update accordingly

### 3. **API Testing**

#### Health Check
```bash
curl http://localhost:3000/api/health
# Response: {"status":"ok","timestamp":"..."}
```

#### Submit Quote
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "01234567890",
    "eventDate": "2024-12-25",
    "eventType": "birthday",
    "details": "Test quote"
  }'
```

#### Get All Quotes
```bash
curl http://localhost:3000/api/admin/quotes
# Response: {"total":X,"quotes":[...]}
```

#### Get Quotes by Status
```bash
curl http://localhost:3000/api/admin/quotes/new
```

#### Update Quote Status
```bash
curl -X PUT http://localhost:3000/api/admin/quotes/[QUOTE_ID] \
  -H "Content-Type: application/json" \
  -d '{"status":"contacted"}'
```

#### Get Analytics
```bash
curl http://localhost:3000/api/admin/analytics
```

### 4. **Database Testing**

#### Check Database File Exists
```bash
ls -la /workspaces/ThePartybox/data/quotes.db
```

#### View Quotes in Database
```bash
sqlite3 /workspaces/ThePartybox/data/quotes.db "SELECT * FROM quotes;"
```

#### View All Tables
```bash
sqlite3 /workspaces/ThePartybox/data/quotes.db ".tables"
```

#### Count Quotes by Status
```bash
sqlite3 /workspaces/ThePartybox/data/quotes.db \
  "SELECT status, COUNT(*) FROM quotes GROUP BY status;"
```

#### Count Quotes by Event Type
```bash
sqlite3 /workspaces/ThePartybox/data/quotes.db \
  "SELECT eventType, COUNT(*) FROM quotes GROUP BY eventType;"
```

### 5. **Mobile Responsiveness**

#### Test at Different Screen Sizes
- [ ] Desktop (1200px+)
  - [ ] Gallery: 3 columns
  - [ ] Call button shows full "01708 898374"
  
- [ ] Tablet (768px)
  - [ ] Gallery: 2 columns
  - [ ] Mobile menu toggle visible
  - [ ] Call button accessible
  
- [ ] Mobile (480px)
  - [ ] Gallery: 1 column
  - [ ] Mobile menu works
  - [ ] Touch targets large enough
  - [ ] Form fields readable

### 6. **Performance Testing**

#### Check Server Status
```bash
# Terminal 1: Check if server is running
curl http://localhost:3000
```

#### Monitor Database
```bash
# Check quotes.db size
du -h /workspaces/ThePartybox/data/quotes.db

# Backup database
cp /workspaces/ThePartybox/data/quotes.db \
   /workspaces/ThePartybox/data/quotes.db.backup
```

### 7. **Complete Workflow Test**

1. **Submit Quote on Website**
   - Go to http://localhost:3000
   - Scroll to Contact Form
   - Fill in all fields:
     - Name: "John Doe"
     - Email: "john@example.com"
     - Phone: "01708123456"
     - Event Date: (select future date)
     - Event Type: "birthday"
     - Details: "Arch and bouquets"
   - Click "Send Quote Request"
   - Verify success message

2. **Check Database**
   ```bash
   sqlite3 /workspaces/ThePartybox/data/quotes.db \
     "SELECT * FROM quotes ORDER BY createdAt DESC LIMIT 1;"
   ```

3. **View in Admin Dashboard**
   - Go to http://localhost:3000/admin
   - Verify quote appears in list
   - Verify statistics updated

4. **Update Quote Status**
   - Click "View" on the quote
   - Change status to "contacted"
   - Click "Update Status"
   - Verify status changes in list
   - Check database: Status should be updated

5. **Check Analytics**
   - Verify "Quotes by Status" chart shows 1 contacted
   - Verify "Quotes by Event Type" shows 1 birthday

## 📊 Sample Test Data

### Test Quote 1
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "phone": "01708555123",
  "eventDate": "2024-12-25",
  "eventType": "birthday",
  "details": "Balloon arch for daughter's 18th birthday party"
}
```

### Test Quote 2
```json
{
  "name": "Emma & David",
  "email": "emma@example.com",
  "phone": "01708555456",
  "eventDate": "2024-06-15",
  "eventType": "wedding",
  "details": "Decorations for wedding reception"
}
```

### Test Quote 3
```json
{
  "name": "Corporate Events Ltd",
  "email": "events@corporate.com",
  "phone": "01708555789",
  "eventDate": "2024-03-10",
  "eventType": "corporate",
  "details": "Branded balloons for company launch event"
}
```

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Try again
npm start
```

### Database Issues
```bash
# Reset database (deletes all data!)
rm /workspaces/ThePartybox/data/quotes.db

# Server will recreate it on startup
npm start
```

### Form Not Submitting
1. Check browser console for errors
2. Verify server is running: `curl http://localhost:3000/api/health`
3. Check network tab in DevTools
4. Verify all required fields are filled

### Admin Dashboard Blank
1. Refresh page
2. Check browser console
3. Verify server API: `curl http://localhost:3000/api/admin/quotes`
4. Check database exists: `ls -la /workspaces/ThePartybox/data/`

## ✅ Success Criteria

- [ ] Website loads without errors
- [ ] Gallery displays 12 items
- [ ] Forms submit successfully
- [ ] Admin dashboard shows all data
- [ ] Database persists quotes
- [ ] Mobile responsive at all sizes
- [ ] API endpoints all working
- [ ] No console errors

**If all checkboxes pass, the system is fully functional!** 🎉
