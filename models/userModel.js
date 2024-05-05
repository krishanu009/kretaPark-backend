const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type:String,
        required: [true, "Please Add the Username"]
    },
    email: {
        type: String,
        required: [true, "Please Add the email address"],
        unique: [true, "Email address already exists"]
    },
    password: {
        type: String,

        required: [true, "Please add the user password"]
    },
    teams:[
        {
            id: { type: String, required: true },
        name: { type: String, required: true },
        }
    ],
    lastLogin:{
        type:String
    }
    
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);