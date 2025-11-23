const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const peopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
    },   
    password: {
        type: String,
        required: true,
    }, 
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},
{
    timestamps: true,
}    
);

peopleSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const People = mongoose.model("People", peopleSchema);

module.exports = People;
