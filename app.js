require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MyData = require('./models/myDataSchema');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from "public" folder

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// POST endpoint
app.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const myData = new MyData({ name });
        await myData.save();
        res.status(201).json({ message: 'Data saved successfully', data: myData });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});