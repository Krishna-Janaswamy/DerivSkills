const http = require('http');

const data = JSON.stringify({
  roleId: "ml-engineer",
  experienceLevel: "Beginner",
  weeklyHours: "10",
  goal: "Learn",
  background: "None"
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/roadmap-plan',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
