const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('express').Router();

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

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

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use('/habits', habitsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('Listening on port: http://localhost:%s', PORT))
