'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/upload', uploadRoutes.routes);
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(config.port, () =>
  console.log(`app listens on http://localhost:${config.port}`)
);
