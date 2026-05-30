const fs = require('fs');
const path = require('path');

function locateFiles(dir, filter, results = []) {
  if (!fs.existsSync(dir)) return results;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file.toLowerCase().includes('penton') || file.toLowerCase().includes('whatsapp')) {
        console.log('Found directory:', filePath);
      }
      locateFiles(filePath, filter, results);
    } else {
      if (filter(file, filePath)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

console.log('Searching for images inside workspace...');
const matchedFiles = locateFiles('.', (name, path) => {
  const norm = name.toLowerCase();
  return norm.includes('whatsapp') || norm.includes('penton') || norm.includes('uy.') || norm.endsWith('.jpeg') || norm.endsWith('.jpg');
});

console.log('All matched files in workspace:', matchedFiles);
