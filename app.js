require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json()); 


app.get('/', (req, res) => {
    res.sendFile("./home.html", { root: __dirname });
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });