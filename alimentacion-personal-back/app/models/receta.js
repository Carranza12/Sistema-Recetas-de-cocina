const mongoose=require("mongoose");
require("dotenv").config();
const recetaSchema=new mongoose.Schema(
    {
        title:{
            type:String
        },
        calories:{
            type:Number
        },
        image:{
            type:String
        },
        ingredientes:{
            type: Array,
            default:[],
        },
        preparacion:{
            type:Array,
            default:[]
        }

    },
    {
        timestamps:true
    });



       
    
    

    module.exports=mongoose.model("Receta",recetaSchema);
    