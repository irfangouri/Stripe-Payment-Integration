const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stripeRoutes = require('./routes/stripeRoutes.js');

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URL, {
  dbName: DB_NAME,
}).then(() => console.log('Successfully connected with MongoDB'))
  .catch((err) => console.error('Error occurred while connected with database, Error: ', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', stripeRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server connected on PORT ${PORT}`);
});
