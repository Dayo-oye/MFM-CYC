# Quick Start Guide

Get the MFM CAASO Youth Church website running in 5 minutes!

## Prerequisites

- [Node.js 18+](https://nodejs.org/) installed
- Text editor (VS Code recommended)
- Terminal/Command Prompt

## Installation

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages (~5 minutes first time).

### Step 2: Start Development Server

```powershell
npm run dev
```

The site will open automatically at `http://localhost:3000`

**That's it!** You're now running the development server with hot reload.

## What Just Happened?

✅ Vite development server started  
✅ Hot module replacement enabled  
✅ Fast refresh on file changes  
✅ Source maps for debugging  

## Available Commands

### Development
```powershell
npm run dev          # Start dev server (with hot reload)
```

### Production
```powershell
npm run build        # Build optimized production files
npm run preview      # Preview production build locally
```

### Code Quality
```powershell
npm run lint         # Check code for issues
npm run format       # Auto-format code with Prettier
```

## Project Structure

```
tesstty/
├── src/                    # New modular source code
│   └── js/
│       ├── main.js         # App entry point
│       └── modules/        # Feature modules
├── assets/                 # Images, icons, fonts
├── *.html                  # HTML pages
├── style.css              # Main stylesheet
├── animations.css         # Animation definitions
└── package.json           # Dependencies
```

## Next Steps

### 1. Update HTML Files (Required)

Replace old script imports in HTML files:

**OLD:**
```html
<script src="main.js" defer></script>
<script src="form-handler.js" defer></script>
```

**NEW:**
```html
<script type="module" src="/src/js/main.js"></script>
```

### 2. Fix Image Paths (Important)

Rename folder (case-sensitive):
- `assets/Images/` → `assets/images/`

Or update all references in HTML to match current case.

### 3. Add Missing Images

The following images are referenced but missing:
- `assets/images/hero-bg.jpg`
- `assets/images/about-hero.jpg`
- `assets/images/contact-hero.jpg`

**Quick Fix:** Use placeholder images or comment out background-image CSS.

## Building for Production

### Create Optimized Build

```powershell
npm run build
```

This creates a `dist/` folder with:
- ✅ Minified HTML, CSS, JavaScript
- ✅ Compressed assets (gzip + brotli)
- ✅ Optimized images
- ✅ Hashed filenames for caching

### Test Production Build

```powershell
npm run preview
```

Opens production build at `http://localhost:4173`

## Deployment (Choose One)

### Option A: Vercel (Recommended - Free)

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow prompts. Site deployed in ~2 minutes!

### Option B: Netlify (Free)

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option C: Traditional Hosting

1. Run `npm run build`
2. Upload `dist/` folder contents via FTP/cPanel
3. Done!

## Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution:** Change port in `vite.config.js` or kill process:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Module not found errors
**Solution:** Re-install dependencies:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Images not loading
**Solution:** Check paths match case (Windows is case-insensitive, but builds aren't)

### Issue: Old JavaScript running
**Solution:** Hard refresh browser: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

## Development Tips

### Hot Reload
Save any file and browser updates instantly. No manual refresh needed!

### Console Errors
Open browser DevTools (F12) to see errors and debug.

### Code Formatting
Before committing:
```powershell
npm run format
```

### Linting
Check for code issues:
```powershell
npm run lint
```

## File Editing Workflow

1. **Edit files** in your text editor
2. **Save** (Ctrl+S)
3. **Browser auto-refreshes** - see changes instantly!
4. **Check console** for errors if needed

## Testing on Mobile

### Local Network Access

1. Find your IP address:
```powershell
ipconfig
```

2. Look for IPv4 Address (e.g., `192.168.1.x`)

3. Access from mobile browser:
```
http://192.168.1.x:3000
```

Make sure mobile device is on same WiFi network.

## Performance Checklist

Before deployment:

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Check all pages load
- [ ] Test forms
- [ ] Verify mobile responsiveness
- [ ] Test in Chrome, Firefox, Safari
- [ ] Check browser console for errors
- [ ] Test all navigation links

## Getting Help

### Documentation
- 📖 **Full README**: `README.md`
- 🚀 **Deployment Guide**: `DEPLOYMENT.md`
- 📋 **Summary**: `RECONSTRUCTION_SUMMARY.md`

### Resources
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com/)

### Support
- Check existing documentation first
- Search for error messages online
- Ask in developer communities

## VS Code Recommended Extensions

Install these for better development experience:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Live Server** - Alternative dev server
- **Auto Rename Tag** - HTML editing
- **Path Intellisense** - File path completion

Install via Extensions panel (`Ctrl+Shift+X`)

## Keyboard Shortcuts

### Vite Dev Server
- `r` - Manually restart server
- `u` - Show server URLs
- `q` - Quit server

### Browser
- `F12` - Open DevTools
- `Ctrl+Shift+R` - Hard refresh
- `Ctrl+Shift+I` - Inspect element

## What's Different?

### Old Architecture
- ❌ No build process
- ❌ Unminified files
- ❌ Manual refreshing
- ❌ Slow development

### New Architecture
- ✅ Optimized builds
- ✅ Hot module replacement
- ✅ Instant feedback
- ✅ Fast development

## Success Indicators

You're on the right track when you see:

✅ `npm run dev` starts without errors  
✅ Browser opens to localhost:3000  
✅ Changes reflect instantly on save  
✅ No console errors in browser  
✅ All pages navigate correctly  

## Ready to Deploy?

Once everything works locally:

1. **Build**: `npm run build`
2. **Preview**: `npm run preview`
3. **Deploy**: Choose hosting (Vercel/Netlify/Other)
4. **Verify**: Test live site thoroughly
5. **Monitor**: Check analytics and errors

---

## 🎉 Congratulations!

You now have a modern, production-ready development environment!

**Need more help?** Read the full `README.md` for detailed information.

**Ready to deploy?** Check `DEPLOYMENT.md` for hosting options.

---

**Built for MFM CAASO Youth Church with ❤️**
