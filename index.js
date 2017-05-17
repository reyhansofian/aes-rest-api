const http = require('http');

const { createApp } = require('./src');

const app = createApp();
const httpPort = 5000;

app.use((err, req, res) => {
  console.error(err.message);
  res.status(500).send('Unable to process the request due to an internal error.');
});

http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP server Started at port ${httpPort} at ${Date.now()}`);
});
