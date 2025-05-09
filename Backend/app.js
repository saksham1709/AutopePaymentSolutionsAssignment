const express = require("express");
const app = express();
const noteRoutes = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const morgan = require("morgan");
const actuator = require('express-actuator');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(actuator());

app.use('/api/notes', noteRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;