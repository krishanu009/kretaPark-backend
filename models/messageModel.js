const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        room:String,
        message:String,
        userId:String,
        username:String,
        __createdtime__:Date
    }
)

module.exports = mongoose.model("message",messageSchema);