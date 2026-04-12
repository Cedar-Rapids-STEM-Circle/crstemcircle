const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');

app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host === 'cedarrapidsstemcircle.web.app' || host === 'cedarrapidsstemcircle.firebaseapp.com') {
    const destination = `https://crstemcircle.org${req.url}`;
    return res.redirect(301, destination);
  }
  next();
});

app.use(express.static(ROOT_DIR, {
  index: false,
  extensions: ['html', 'js', 'css', 'webp', 'svg', 'png', 'jpg', 'jpeg']
}));

app.get('*', (req, res) => {
  if (fs.existsSync(INDEX_FILE)) {
    return res.sendFile(INDEX_FILE);
  }
  res.status(404).send('Not found');
});

exports.redirector = functions.https.onRequest(app);
