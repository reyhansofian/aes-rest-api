const http = require('http');

const { createApp } = require('./src');

const app = createApp();
const httpPort = process.env.PORT || 5000;

app.use((err, req, res) => {
  console.error(err.message);
  res.status(500).send('Unable to process the request due to an internal error.');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP server Started at port ${httpPort} at ${Date.now()}`);
});
