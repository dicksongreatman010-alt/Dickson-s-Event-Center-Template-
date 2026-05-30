const https = require('https');

const testUrl = 'https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template/main/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM%20(1).jpeg';

https.get(testUrl, (res) => {
  res.resume();
  console.log('Status of repository without dash:', res.statusCode);
}).on('error', (err) => {
  console.log('Error:', err.message);
});
