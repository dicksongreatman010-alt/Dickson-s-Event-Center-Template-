const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.github.com',
  path: `/search/code?q=filename:uy.jpeg+user:dicksongreatman010-alt`,
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
      fs.writeFileSync('gh-search-results.txt', JSON.stringify(json, null, 2));
      console.log('GitHub search complete.');
    } catch (e) {
      fs.writeFileSync('gh-search-results.txt', `Error: ${e.message}`);
    }
  });
});
