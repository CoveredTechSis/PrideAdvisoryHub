# Pride Advisory Design Guidelines

## Design Approach

**Hybrid Strategy:** Material Design foundation with inspiration from leading fintech platforms (Robinhood, Stripe, Vanguard) adapted for Nigerian institutional investment context. This creates a modern, trustworthy, data-transparent experience that positions Pride Advisory as a premium, tech-forward investment firm.

**Core Design Principles:**
1. **Institutional Trust:** Professional polish with subtle premium touches
2. **Data Transparency:** Clear, readable performance metrics and charts
3. **Confident Clarity:** Direct communication without jargon barriers
4. **Accessible Sophistication:** Complex services made approachable

## Typography

**Font Families (Google Fonts):**
- **Primary (Headings):** Inter (600, 700, 800 weights) - modern, professional, excellent readability
- **Secondary (Body):** Inter (400, 500 weights) - consistent family for cohesion
- **Data/Numbers:** JetBrains Mono (500, 600) - for performance metrics, tickers, calculators

**Hierarchy:**
- H1 (Hero): 3.5rem (desktop), 2.25rem (mobile), font-weight 800
- H2 (Section): 2.5rem (desktop), 1.875rem (mobile), font-weight 700
- H3 (Subsection): 1.875rem (desktop), 1.5rem (mobile), font-weight 600
- Body Large: 1.125rem, font-weight 400, line-height 1.7
- Body Regular: 1rem, font-weight 400, line-height 1.6
- Small/Legal: 0.875rem, font-weight 400, line-height 1.5
- Data Display: 1.25rem-2rem, JetBrains Mono, font-weight 600

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16, 24, 32 for consistent rhythm
- Component internal spacing: p-4, p-8
- Section vertical padding: py-16 (mobile), py-24 (desktop)
- Grid gaps: gap-8, gap-12
- Margins between major sections: mb-16, mb-24

**Container Strategy:**
- Max-width: max-w-7xl for most content sections
- Full-width: Dashboard charts, market ticker, hero
- Prose width: max-w-4xl for blog articles, legal content
- Forms: max-w-2xl centered for focused interactions

**Grid Patterns:**
- Services: 2 columns (tablet), 4 columns (desktop)
- Performance portfolios: 3 columns card grid
- Team members: 3-4 columns with headshots
- Blog articles: 3 columns with featured post spanning 2 columns
- Testimonials: 2 columns alternating layout

## Component Library

### Navigation
- Sticky header with gradient backdrop blur
- Logo left, main nav center, CTA buttons (Login + Book Consultation) right
- Mobile: Hamburger menu with slide-in drawer
- Secondary nav for client portal with dashboard tabs

### Hero Section
- Full-width with large background image (Nigerian financial district/modern office)
- Centered content with max-w-4xl
- Trust badges row beneath headline (SEC Registered, CAC Verified, NDPR Compliant)
- Dual CTA buttons with glass morphism effect on image
- Scroll indicator animation

### Cards & Content Blocks
- Service cards: Icon top, title, description, hover lift effect
- Performance portfolio cards: Header with portfolio name, key metrics grid, mini chart, view details button
- Team cards: Professional headshot, name, title, credentials, LinkedIn icon
- Blog cards: Featured image, category tag, title, excerpt, read time
- Testimonial cards: Quote, client name/company, metrics achieved

### Data Visualization
- Chart containers: White/subtle background, clear labels, grid lines
- Performance metrics: Large numbers with context labels, percentage changes with trend indicators
- Market ticker: Horizontal scroll, stock symbols with price/change, auto-refresh indicator
- Calculators: Input fields with clear labels, instant calculation display, visual result cards

### Forms & Interactive Elements
- Input fields: Floating labels, clear focus states, validation messaging
- File upload: Drag-and-drop zone with upload progress
- Calendar picker: Month view with available slots highlighted
- Two-factor auth: OTP input with auto-focus progression

### Trust & Compliance Elements
- Regulatory badges: SEC/CAC logos with registration numbers
- Risk disclaimer: Expandable panel with clear typography
- Cookie banner: Bottom sticky with accept/customize options
- NDPR privacy notice: Modal with structured sections

### Blog & Content
- Article layout: Hero image, author bio sidebar, table of contents, social share buttons
- Whitepaper download cards: PDF preview, download button, file size indicator
- Research insights: Filterable grid, search functionality, category tags

## Images & Visual Strategy

**Hero Section:**
Large, professional background image depicting Nigerian financial success - modern Lagos skyline, professional business setting, or abstract financial growth visualization. Apply subtle gradient overlay (dark to transparent top-to-bottom) for text legibility. Image should convey trust, progress, and Nigerian context.

**Service Section Icons:**
Use Heroicons (outline style) for service categories - chart-bar for equity advisory, document-check for fixed income, briefcase for portfolio construction, shield-check for risk management.

**Performance Dashboard:**
Include sample chart images or use chart.js for live interactive visualizations. Show professional, clean line charts and bar graphs with Nigerian stock market data examples.

**Team Section:**
Professional headshots in circular frames with subtle shadow, positioned above name/credentials. Background should be neutral professional setting.

**Testimonials:**
Client company logos (placeholder or actual), professional portrait photos where available.

**Blog/Research:**
Featured article images related to Nigerian financial markets, investment strategies, stock market imagery. Use 16:9 aspect ratio for consistency.

**Trust Signals Throughout:**
Small logos for regulatory bodies (SEC Nigeria, CAC), security badges (SSL, encryption), partner logos, media mentions.

**CTA Sections:**
Background images with glass-morphism button overlays (blurred backgrounds on buttons as specified) showing professional team interactions, client consultations, or modern office environments.