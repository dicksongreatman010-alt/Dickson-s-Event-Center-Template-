const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.github.com',
  path: '/repos/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/commits/c4f095fb69ae972aac7f13ff141fe01498fad9e2',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.files) {
        const fileNames = json.files.map(f => f.filename);
        fs.writeFileSync('gh-commit-files.txt', fileNames.join('\n'));
        console.log('Latest commit files written.');
      } else {
        fs.writeFileSync('gh-commit-files.txt', JSON.stringify(json, null, 2));
      }
    } catch (e) {
      fs.writeFileSync('gh-commit-files.txt', `Error: ${e.message}`);
    }
  });
});
