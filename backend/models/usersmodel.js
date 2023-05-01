const mongoose = require('mongoose');


const passgerSchema = mongoose.Schema(
    {
        name:String,
        age:String,
    }
)

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            //required: true
        },
        password: {
            type: String,                   
            //required: true
        },
        
        isAdmin: {
            type: Boolean,
            //default: false,
          },
        email: {
            type: String,
            unique:true,                
            //required: true
            
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
      
    }
);

module.exports = mongoose.model("users",userSchema);

