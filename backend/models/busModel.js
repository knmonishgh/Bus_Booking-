const mongoose = require('mongoose');


const busSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    journeyDate:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    seatsBooked:{
        type:Array,
        default:[],
    },
    status:{
        type:String,
        default:"Yet To start"
    },
})


module.exports =mongoose.model("buses",busSchema);