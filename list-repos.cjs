const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.github.com',
  path: '/users/dicksongreatman010-alt/repos',
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
      if (Array.isArray(json)) {
        const repos = json.map(r => r.name);
        fs.writeFileSync('gh-repos-list.txt', repos.join('\n'));
        console.log('GitHub repos listed:', repos);
      } else {
        fs.writeFileSync('gh-repos-list.txt', JSON.stringify(json, null, 2));
        console.log('GitHub API response not an array.');
      }
    } catch (e) {
      fs.writeFileSync('gh-repos-list.txt', `Error: ${e.message}`);
    }
  });
});
