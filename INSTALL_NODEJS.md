# Installing Node.js on Windows

Node.js is required to use the modern build system for this project.

## Quick Installation (Recommended)

### Option 1: Official Installer (Easiest)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Current recommended: Node.js 20.x LTS

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installer
   - **Important**: Make sure "Add to PATH" is checked
   - Complete the installation

3. **Verify Installation**
   Open a **new** PowerShell window and run:
   ```powershell
   node --version
   npm --version
   ```
   
   You should see version numbers like:
   ```
   v20.x.x
   10.x.x
   ```

4. **Restart PowerShell**
   Close and reopen PowerShell for PATH changes to take effect.

### Option 2: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

Then restart PowerShell.

### Option 3: Using Chocolatey

If you have Chocolatey installed:

```powershell
choco install nodejs-lts
```

## After Installation

### 1. Verify Node.js is Working

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Test Node.js
node -e "console.log('Node.js is working!')"
```

### 2. Install Project Dependencies

Navigate to the project folder and run:

```powershell
cd C:\Users\Deewhy\Desktop\tesstty
npm install
```

This will install all required packages (~5 minutes first time).

### 3. Start Development Server

```powershell
npm run dev
```

Your browser will open automatically to `http://localhost:3000`

## Troubleshooting

### Issue: "npm is not recognized"

**Solution 1: Restart PowerShell**
Close all PowerShell windows and open a new one.

**Solution 2: Check PATH**
1. Press `Win + X`, select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find "Path"
5. Verify these paths exist:
   - `C:\Program Files\nodejs\`
   - `C:\Users\YourUsername\AppData\Roaming\npm`

**Solution 3: Reinstall Node.js**
Uninstall and reinstall Node.js with default options.

### Issue: Permission denied errors

**Solution: Run as Administrator**
Right-click PowerShell and select "Run as Administrator"

### Issue: Slow installation

**Solution: Change npm registry (optional)**
```powershell
npm config set registry https://registry.npmjs.org/
```

### Issue: Certificate errors

**Solution: Configure SSL**
```powershell
npm config set strict-ssl false
```
(Not recommended for production, only for testing)

## Alternative: Use Current Files Without Build System

If you cannot install Node.js right now, you can still use the website:

### Option A: Keep Using Old JavaScript

1. Keep using `main.js` and `form-handler.js` as is
2. Open `index.html` directly in browser
3. No build step needed

### Option B: Use VS Code Live Server

1. Install VS Code: https://code.visualstudio.com/
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Works without Node.js!

## Testing Installation

Create a test file `test-node.js`:

```javascript
console.log('Node.js version:', process.version);
console.log('Node.js is working correctly! ✓');
```

Run it:
```powershell
node test-node.js
```

If you see output, Node.js is installed correctly!

## Next Steps After Installation

1. ✅ Node.js installed and verified
2. ✅ Run `npm install` in project folder
3. ✅ Run `npm run dev` to start development
4. ✅ Make changes and see instant updates!

## Getting Help

- **Node.js Documentation**: https://nodejs.org/docs/
- **npm Documentation**: https://docs.npmjs.com/
- **Stack Overflow**: Search for your specific error message

## Important Notes

- **Always use LTS version** for stability
- **Restart PowerShell** after installation
- **Run from project directory** when using npm commands
- **Check for updates** periodically: `npm outdated`

---

**Once Node.js is installed, return to QUICKSTART.md to continue setup!**
