const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync('./cert/ca/client1-key.pem'),
  cert: fs.readFileSync('./cert/ca/client1-crt.pem'),
  ca: fs.readFileSync('./cert/ca/ca-crt.pem'),
  https: true
};

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = https.createServer(options, app);
server.listen(port, () => console.log('Running'));
