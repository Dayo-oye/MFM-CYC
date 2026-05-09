# MFM CAASO Youth Church Website

Official website for MFM CAASO Youth Church (Upperroom Tabernacle) - A vibrant community raising fire-brand youths for God's kingdom.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or npm/yarn/pnpm
- Modern web browser

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
tesstty/
├── assets/
│   ├── icons/          # Favicon and icons
│   └── images/         # Images and graphics
├── src/                # Source files (to be created)
│   ├── js/            # JavaScript modules
│   ├── css/           # Stylesheets
│   └── components/    # Reusable components
├── *.html             # HTML pages
├── style.css          # Main stylesheet
├── main.js            # Main JavaScript
├── animations.css     # Animation definitions
├── form-handler.js    # Form handling logic
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies
└── README.md          # This file
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with breakpoints at 576px, 768px, 1024px
- **Modern UI**: CSS custom properties, gradients, shadows, smooth animations
- **Performance Optimized**: Code splitting, lazy loading, minification
- **SEO Ready**: Semantic HTML, meta tags, structured data
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Form Validation**: Client-side validation with real-time feedback
- **Animations**: Scroll-triggered animations with IntersectionObserver

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint JavaScript files |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests |

## 🎯 Pages

- **Home** (`index.html`) - Landing page with hero, mission, services
- **About** (`about.html`) - Church history, vision, values, leadership
- **Services** (`services.html`) - Service times and schedules
- **Programs** (`programs.html`) - Youth programs and activities
- **Outreach** (`outreach.html`) - Community outreach initiatives
- **Testimonies** (`testimonies.html`) - Member testimonials
- **Giving** (`giving.html`) - Donation and offering information
- **Gallery** (`gallery.html`) - Photo gallery
- **Contact** (`contact.html`) - Contact form and information

## 🎨 Design System

### Colors
- **Primary**: `#4c1d95` (Purple)
- **Secondary**: `#312e81` (Deep Purple)
- **Accent**: `#f59e0b` (Orange)
- **Neutrals**: Gray scale (50-900)

### Typography
- **Headings**: Poppins
- **Body**: Montserrat
- **Accent**: Playfair Display

### Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 1024px
- **Large**: > 1024px

## 🔧 Configuration Files

- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Code formatting
- `vite.config.js` - Build configuration
- `.gitignore` - Git ignore rules

## 📦 Build Output

Production build generates:
- Minified HTML, CSS, and JavaScript
- Optimized images
- Gzip and Brotli compressed assets
- Source maps (optional)

## 🚀 Deployment

### Recommended Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment
- **GitHub Pages**: Free hosting for static sites

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Code Standards

- Use ES6+ features
- Follow ESLint rules
- Write semantic HTML
- Use BEM methodology for CSS classes (recommended)
- Comment complex logic
- Write meaningful commit messages

## 🐛 Known Issues

- Missing background images (hero-bg.jpg, about-hero.jpg, contact-hero.jpg)
- Form submissions are simulated (backend integration needed)
- Some pages have duplicated header/footer code

## 📋 TODO

- [ ] Implement component-based architecture
- [ ] Add unit tests
- [ ] Integrate with backend API
- [ ] Add CMS for content management
- [ ] Implement service worker for offline support
- [ ] Add structured data (JSON-LD)
- [ ] Create XML sitemap
- [ ] Optimize images (WebP/AVIF)
- [ ] Add analytics integration

## 📞 Contact

**MFM CAASO Youth Church**
- **Location**: CAASO Church Auditorium, 16 Suberu Oje Rd, Alagbado, Lagos, Nigeria
- **Phone**: +234 803 186 7487 | +234 814 169 8503
- **Email**: mfmcaasoyouthchurch@gmail.com
- **Service Time**: Sundays at 7:25 AM (WAT)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- MFM CAASO Youth Church community
- All contributors and supporters

---

**Built with ❤️ for the glory of God**
