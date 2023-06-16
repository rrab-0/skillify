'use strict';
// setup
const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');
const app = express();
const port = config.port || 8080;

// high limit is for uploading dummy "job" datas
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// routes available
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

// specifies where app listens
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
