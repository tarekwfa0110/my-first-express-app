const mongoose = require('mongoose');

const myDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"]
    }
});

const MyData = mongoose.model('MyData', myDataSchema);
module.exports = MyData;