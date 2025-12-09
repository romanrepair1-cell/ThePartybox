import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Database initialization
// On Vercel: use in-memory or /tmp directory for temporary storage
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const dbPath = isVercel 
    ? '/tmp/quotes.db'  // Use /tmp on Vercel (not persistent)
    : path.join(__dirname, 'data', 'quotes.db');

const dataDir = path.dirname(dbPath);

// Create data directory if it doesn't exist (not needed for /tmp, but safe to check)
try {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
} catch (e) {
    // Directory may not be writable on Vercel
    console.warn('Could not create data directory:', e.message);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log(`Connected to SQLite database at ${isVercel ? '/tmp (temporary)' : dbPath}`);
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Quotes table
        db.run(`
            CREATE TABLE IF NOT EXISTS quotes (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                eventDate TEXT NOT NULL,
                eventType TEXT NOT NULL,
                details TEXT NOT NULL,
                status TEXT DEFAULT 'new',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Page visits tracking
        db.run(`
            CREATE TABLE IF NOT EXISTS pageVisits (
                id TEXT PRIMARY KEY,
                page TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                userAgent TEXT,
                ipAddress TEXT
            )
        `);

        // Gallery interactions
        db.run(`
            CREATE TABLE IF NOT EXISTS galleryInteractions (
                id TEXT PRIMARY KEY,
                itemId INTEGER NOT NULL,
                category TEXT NOT NULL,
                action TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database tables initialized');
    });
}

// ==========================================
// API ROUTES
// ==========================================

// Submit quote request
app.post('/api/quotes', (req, res) => {
    const { name, email, phone, eventDate, eventType, details } = req.body;

    // Validation
    if (!name || !email || !eventDate || !eventType || !details) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    const sql = `
        INSERT INTO quotes (id, name, email, phone, eventDate, eventType, details, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [id, name, email, phone, eventDate, eventType, details, createdAt], function (err) {
        if (err) {
            console.error('Error inserting quote:', err);
            return res.status(500).json({ error: 'Failed to save quote' });
        }

        res.status(201).json({
            success: true,
            message: 'Quote request saved successfully',
            id: id,
            timestamp: createdAt
        });

        // Log to console
        console.log(`📧 New Quote Request from ${name} (${email})`);
        console.log(`   Event: ${eventType} on ${eventDate}`);
    });
});

// Get all quotes (admin)
app.get('/api/admin/quotes', (req, res) => {
    const sql = `
        SELECT * FROM quotes ORDER BY createdAt DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching quotes:', err);
            return res.status(500).json({ error: 'Failed to fetch quotes' });
        }

        res.json({
            total: rows.length,
            quotes: rows
        });
    });
});

// Get quotes by status
app.get('/api/admin/quotes/:status', (req, res) => {
    const { status } = req.params;

    const sql = `
        SELECT * FROM quotes WHERE status = ? ORDER BY createdAt DESC
    `;

    db.all(sql, [status], (err, rows) => {
        if (err) {
            console.error('Error fetching quotes:', err);
            return res.status(500).json({ error: 'Failed to fetch quotes' });
        }

        res.json({
            status: status,
            total: rows.length,
            quotes: rows
        });
    });
});

// Update quote status
app.put('/api/admin/quotes/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = `
        UPDATE quotes SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
    `;

    db.run(sql, [status, id], function (err) {
        if (err) {
            console.error('Error updating quote:', err);
            return res.status(500).json({ error: 'Failed to update quote' });
        }

        res.json({
            success: true,
            message: `Quote status updated to ${status}`,
            id: id
        });

        console.log(`✅ Quote ${id} marked as ${status}`);
    });
});

// Track page visit
app.post('/api/tracking/pagevisit', (req, res) => {
    const { page } = req.body;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const id = uuidv4();

    const sql = `
        INSERT INTO pageVisits (id, page, userAgent, ipAddress)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [id, page, userAgent, ipAddress], (err) => {
        if (err) {
            console.error('Error tracking page visit:', err);
        }
        res.json({ success: true });
    });
});

// Track gallery interaction
app.post('/api/tracking/gallery', (req, res) => {
    const { itemId, category, action } = req.body;
    const id = uuidv4();

    const sql = `
        INSERT INTO galleryInteractions (id, itemId, category, action)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [id, itemId, category, action], (err) => {
        if (err) {
            console.error('Error tracking gallery interaction:', err);
        }
        res.json({ success: true });
    });
});

// Get analytics dashboard data
app.get('/api/admin/analytics', (req, res) => {
    db.serialize(() => {
        let analytics = {};

        // Total quotes
        db.get('SELECT COUNT(*) as count FROM quotes', (err, row) => {
            analytics.totalQuotes = row.count;

            // Quotes by status
            db.all(
                'SELECT status, COUNT(*) as count FROM quotes GROUP BY status',
                (err, rows) => {
                    analytics.quotesByStatus = rows.reduce((acc, row) => {
                        acc[row.status] = row.count;
                        return acc;
                    }, {});

                    // Quotes by event type
                    db.all(
                        'SELECT eventType, COUNT(*) as count FROM quotes GROUP BY eventType',
                        (err, rows) => {
                            analytics.quotesByEventType = rows.reduce((acc, row) => {
                                acc[row.eventType] = row.count;
                                return acc;
                            }, {});

                            // Page visits
                            db.get('SELECT COUNT(*) as count FROM pageVisits', (err, row) => {
                                analytics.totalPageVisits = row.count;

                                // Gallery interactions
                                db.get('SELECT COUNT(*) as count FROM galleryInteractions', (err, row) => {
                                    analytics.totalGalleryInteractions = row.count;

                                    res.json(analytics);
                                });
                            });
                        }
                    );
                }
            );
        });
    });
});

// Admin Dashboard route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve main site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'gallery.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
export default app;

// Start server locally (not on Vercel)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║          ThePartybox Server Started                        ║');
        console.log(`║          Server running on http://localhost:${PORT}${PORT === 3000 ? '            ' : '           '}║`);
        console.log('║          Admin Dashboard: http://localhost:' + PORT + '/admin' + (PORT === 3000 ? '       ' : '      ') + '║');
        console.log('║          API Health: http://localhost:' + PORT + '/api/health        ║');
        console.log('╚═══════════════════════════════════════════════════════════╝');
        console.log('');
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\nShutting down server...');
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('Database connection closed');
            }
            process.exit(0);
        });
    });
}
