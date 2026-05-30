const https = require('https');

https.get('https://api.github.com/repos/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/git/trees/main?recursive=1', {
  headers: {
    'User-Agent': 'node.js'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.tree) {
      json.tree.forEach(item => {
        console.log(item.path);
      });
    } else {
      console.log(json);
    }
  });
});
