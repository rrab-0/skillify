'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

const app = express();

app.use(express.json());

// const corsOptions = {
//   origin: '',
// }

app.use(cors());

app.use('/user', userRoutes.routes);
app.use('/job', jobRoutes.routes);
app.use('/upload', uploadRoutes.routes);
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/views/apidocumentation.html');
});
app.get('/', (req, res) => {
  res.send('service is up and running');
});

// app.listen(config.port, () =>
//   console.log(`app listens on http://localhost:${config.port}`)
// );

const port = config.port || 8080;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
