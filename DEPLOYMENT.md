# Deployment Guide

This guide covers deploying the MFM CAASO Youth Church website to production.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm
- Git installed
- Access to hosting provider

## Installation

### 1. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm  
pnpm install
```

### 2. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site in development mode.

## Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory with:
- Minified HTML, CSS, and JavaScript
- Optimized images
- Gzip and Brotli compressed assets
- Hashed filenames for cache busting

### Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers zero-config deployment with global CDN.

#### Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Deploy via Git

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

### Option 2: Netlify

Netlify provides continuous deployment from Git.

#### Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

#### Deploy via Git

1. Push code to GitHub
2. Connect repository in Netlify
3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy automatically on push

**Configuration file** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Option 3: GitHub Pages

Free hosting for static sites.

#### Setup

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add script to package.json:
```json
{
  "scripts": {
    "deploy:gh": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy:gh
```

4. Configure custom domain in repository settings

### Option 4: Traditional Hosting (cPanel, FTP)

1. Build the project:
```bash
npm run build
```

2. Upload contents of `dist/` folder to server:
   - Via FTP client (FileZilla, Cyberduck)
   - Via cPanel File Manager
   - Via SSH/SFTP

3. Configure server:
   - Set document root to uploaded directory
   - Enable gzip compression
   - Configure caching headers

## Environment Variables

For different environments, create `.env` files:

### `.env.development`
```env
VITE_API_URL=http://localhost:3001
VITE_GA_ID=
VITE_SENTRY_DSN=
```

### `.env.production`
```env
VITE_API_URL=https://api.yourdomain.com
VITE_GA_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Performance Optimization

### 1. Image Optimization

```bash
# Optimize images before deployment
npm run optimize:images
```

### 2. Cache Configuration

#### Apache (.htaccess)
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

#### Nginx
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml;
```

## Security Headers

Add security headers to server configuration:

### Vercel (`vercel.json`)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## SSL/HTTPS

### Free SSL Options:
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- Cloudflare: Free SSL + CDN
- Let's Encrypt: Free SSL certificates

## Monitoring

### 1. Google Analytics

Add tracking code in production build:
```js
// In vite.config.js or HTML
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
```

### 2. Error Tracking

Integrate Sentry for error monitoring:
```bash
npm install @sentry/browser
```

### 3. Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

## CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test forms submission
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Test page load speed (GTmetrix, PageSpeed Insights)
- [ ] Verify analytics tracking
- [ ] Test cross-browser compatibility
- [ ] Check 404 error page
- [ ] Verify all links work
- [ ] Test contact form email delivery
- [ ] Verify social media links
- [ ] Check SEO meta tags
- [ ] Test sharing on social media

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Netlify
Use the Netlify dashboard to roll back to a previous deployment.

### Manual Rollback
Keep previous `dist/` folder backup to quickly restore.

## Support

For deployment issues:
- Check build logs
- Verify environment variables
- Test locally with `npm run preview`
- Check browser console for errors
- Review deployment provider logs

## Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://pages.github.com/)
