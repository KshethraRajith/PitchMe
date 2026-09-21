const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Exporting web app with Expo...');
execSync('npx expo export --platform web', { stdio: 'inherit' });

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');
  // Make static assets relative so it works on GitHub Pages subpaths or root domains
  html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
  html = html.replace(/href="\/_expo\//g, 'href="./_expo/');
  
  // Also add a friendly title and responsive styles
  html = html.replace('<title>PitchMe</title>', '<title>PitchMe - AI Voice Interview Coach</title>');

  fs.writeFileSync(indexPath, html, 'utf-8');

  // Copy to 404.html for GitHub Pages SPA routing support
  const notFoundPath = path.join(distPath, '404.html');
  fs.writeFileSync(notFoundPath, html, 'utf-8');

  // Disable Jekyll processing so _expo directory is served correctly
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '', 'utf-8');

  // Copy privacy.html for Google Play Store compliance
  const privacySrc = path.join(__dirname, '..', 'privacy.html');
  if (fs.existsSync(privacySrc)) {
    fs.copyFileSync(privacySrc, path.join(distPath, 'privacy.html'));
  }

  console.log('✅ Web build processed with relative assets, .nojekyll, privacy policy & 404 fallback!');
} else {
  console.error('❌ dist/index.html not found!');
  process.exit(1);
}
