'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes.routes);
app.use('/job', jobRoutes.routes);
app.use('/upload', uploadRoutes.routes);
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(config.port, () =>
  console.log(`app listens on http://localhost:${config.port}`)
);
