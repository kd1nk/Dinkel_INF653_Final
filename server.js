require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// Establish connection to the database
connectDB();

// Custom logging middleware
app.use(logger);

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors()); // Use `corsOptions` for restricted API access

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use('/', express.static(path.join(__dirname, '/public')));

// Define application routes
app.use('/', require('./routes/root'));
app.use('/states', require('./routes/api/states'));

// Handle undefined routes with a 404 response
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Centralized error handling middleware
app.use(errorHandler);

// Start the server after successful database connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
