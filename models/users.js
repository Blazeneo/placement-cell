const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate: {
            validator: function(value) {
                // validates and checks if the email is from codingninjas
                return /\b(?:[a-zA-Z0-9._%+-]+)@codingninjas\.com\b/.test(value);
            },
            message: 'Email must be from codingninjas.com domain'
        }
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports=User;