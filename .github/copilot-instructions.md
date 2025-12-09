# ThePartybox - AI Agent Instructions

## Project Overview
**ThePartybox** is a responsive website for a balloon shop business in Hornchurch, England. It's a **static HTML/CSS/JavaScript project** (no frameworks) with two main pages: `index.html` (home) and `gallery.html` (full gallery view).

**Key Business Focus:** Drive customer engagement through visual impact and conversion to quotes/phone calls (01708 898374).

## Architecture & Key Components

### Page Structure
- **index.html**: Multi-section landing page with hero, features, gallery preview, testimonials, services, contact form, and embedded Google Maps
- **gallery.html**: Extended gallery view with advanced filtering and categorized display

### External Dependencies
- **Fonts**: Google Fonts (Inter for body, Fredoka One for headlines)
- **Icons**: Font Awesome 6.4.0 (CDN)
- **CSS/JS**: Referenced but not included in repo - `css/style.css` and `js/main.js` must be created/maintained separately

### Critical Design System
- **Colors** (CSS variables): Electric Blue (#00BFFF), Hot Pink (#FF1493), Gold (#FFD700), White, Light Gray
- **Typography**: Inter (body, weights 300-700), Fredoka One (headlines)
- **Spacing/Utilities**: Using CSS variables like `--spacing-md`, `--spacing-lg`, `--radius-lg`, `--shadow-md`
- **Responsive Breakpoints**: Mobile-first approach; gallery adapts 3 columns (desktop) → 1 column (mobile)

## Key Features & Implementation Patterns

### Gallery System
- **Data**: Gallery items loaded dynamically from JavaScript arrays (source: `js/main.js`)
- **Categories**: "all", "birthdays", "weddings", "corporate" (via `data-category` attributes on filter buttons)
- **Filtering**: One-click button filters; supports lightbox viewer for full-screen image viewing
- **Visual**: Grid with `aspect-ratio` and smooth hover effects

### Form Handling
- **Quote Form** (`#quote-form`): Captures name, email, phone, event-date, event-type, details
- **Validation**: Client-side validation required (form elements marked with `required`)
- **Behavior**: Submission simulated with loading states; presently does NOT POST to backend

### Interactive Elements
1. **Mobile Menu**: Hamburger toggle (`#nav-toggle`) toggles `#nav-menu`
2. **Testimonial Carousel**: Auto-rotates slides; controlled by `#prev-testimonial` and `#next-testimonial` buttons
3. **Scroll Animations**: Uses Intersection Observer (referenced in README) for fade-in effects
4. **Lightbox Modal**: `#lightbox` element displays full images; triggered by gallery item clicks

### Click-to-Call Integration
- **Tel Links**: Used throughout (`href="tel:01708898374"`)
- **Sticky Call Button**: Header button with phone icon for mobile prominence
- **Footer Placement**: Phone number in footer with clickable link

## Development Workflow

### Missing Assets to Create
Before the site is functional, you MUST create:
1. **css/style.css** - Contains all styling (CSS variables, grid layouts, responsiveness, animations)
2. **js/main.js** - Implements:
   - Gallery data as JavaScript array with objects: `{id, category, title, image}`
   - Gallery filtering logic and rendering to `#gallery-grid`
   - Testimonial carousel rotation
   - Mobile menu toggle
   - Form submission handling
   - Lightbox open/close logic
   - Smooth scrolling (optional enhancement)
   - Intersection Observer for scroll animations

### Key JavaScript Entry Points
- Gallery items dynamically populate `.gallery-grid` (preview and full gallery pages)
- Form `#quote-form` capture and validation
- Element IDs for interactivity: `#nav-menu`, `#nav-toggle`, `#lightbox`, `#gallery-grid`, carousel buttons

## SEO & Accessibility
- Semantic HTML structure with proper heading hierarchy
- Meta descriptions optimized for local search ("balloon shop Hornchurch")
- Business address, hours, and phone number prominently displayed
- Images include alt text; placeholders describe content
- Aria-labels on social links

## Code Conventions
- **Class-Based Architecture**: Modular JS using classes (referenced in README)
- **Event Delegation**: For dynamically created gallery items
- **Debounced Scrolling**: Performance optimization for scroll events
- **CSS Variables**: All colors, spacing, and shadows use custom properties
- **No External Frameworks**: Vanilla HTML5, CSS3, ES6+ JavaScript only

## Common Tasks for AI Agents

### Adding a Gallery Image
1. Add object to gallery array in `js/main.js`: `{id: X, category: "event-type", title: "...", image: "path/url"}`
2. Ensure category matches filter buttons in HTML
3. Gallery will auto-render on page load

### Updating Business Info
- **Phone**: Update `01708898374` in header, footer, hero buttons (search entire workspace)
- **Address/Hours**: Contact section in `index.html`; update corresponding HTML and business info display

### Styling Adjustments
- All colors use CSS variables in `css/style.css` (e.g., `--electric-blue`, `--hot-pink`, `--gold`)
- Modify variables centrally rather than inline styles
- Test responsive behavior; gallery grid uses `minmax()` for mobile adaptation

### Form Enhancement
- Add form submission via fetch to backend endpoint (currently simulated)
- Validate email, phone format client-side before submission
- Persist form data or reset after successful submission

## References
- README.md contains feature list and design rationale
- Font Awesome docs: https://fontawesome.com/search (for available icons)
- Google Fonts: Inter, Fredoka One (already imported in HTML)
