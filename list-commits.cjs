const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.github.com',
  path: '/repos/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/commits',
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
        const commitMsgs = json.map(c => `${c.sha}: ${c.commit.message} by ${c.commit.author.name}`);
        fs.writeFileSync('gh-commits.txt', commitMsgs.join('\n'));
        console.log('GitHub commits listed.');
      } else {
        fs.writeFileSync('gh-commits.txt', JSON.stringify(json, null, 2));
      }
    } catch (e) {
      fs.writeFileSync('gh-commits.txt', `Error: ${e.message}`);
    }
  });
});
