const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
    {
        roomName:String,
        members: [
            {
                id: { type: String, required: true }, 
                name: { type: String, required: true }
            }
        ],
        __createdtime__:Date
    }
)

module.exports = mongoose.model("room",roomSchema);