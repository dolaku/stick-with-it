const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// DB
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connected successfully!');
});

// routes
const habitsRouter = require('./routes/habits');
const usersRouter = require('./routes/users');

app.use('/habits', habitsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('Listening on port: http://localhost:%s', PORT))
