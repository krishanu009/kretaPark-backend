const mongoose = require('mongoose');

const scriptSchema = mongoose.Schema(
    {
        _id: String,
        title: String,
        data: Object,
        active: Boolean
    }
    
)
module.exports = mongoose.model("script",scriptSchema );