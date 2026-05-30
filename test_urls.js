const https = require('https');
https.get('https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/main/Gemini_Generated_Image_rz6kd2rz6kd2rz6k%20(1).png', res => console.log('raw:', res.statusCode));
https.get('https://github.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/blob/main/Gemini_Generated_Image_rz6kd2rz6kd2rz6k%20(1).png?raw=true', res => console.log('blob:', res.statusCode, res.headers.location));
