const mongoose=require('mongoose');
const schema= mongoose.Schema;
const userSchema=new schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    peso:{
        type:Number,
        required:true
    },
    estatura:{
        type:Number,
        required:true
    },
    edad:{
        type:Number,
        required:true
    },
    objetivo:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports=userSchema;