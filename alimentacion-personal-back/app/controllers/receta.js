const  mongoose  = require("mongoose");
const multer = require("multer");
const multerConfig=require("../utils/multerConfig");
const model= require("../models/receta");

const parseId=(id)=>{
    return mongoose.Types.ObjectId(id)
}

const upload =multer(multerConfig).single('image');

exports.fileUpload=(req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({message:error});
        }
        return next();
    });
}

exports.obtenerRecetas=(req,res)=>{
    model.find({},(err,docs)=>{
        res.send(docs)
    })
}

exports.crearReceta=(req,res)=>{
    const data= new model(req.body);
   try {
    
    if(req.file && req.file.filename){
        data.image=req.file.filename;
    }
    model.create(data,(err,docs)=>{
        res.json({message:'Receta agregada correctamente!'});
    })
   } catch (error) {
       res.status(400).json({
           message:'Error al procesar la peticion'
       });
   }
    
}

exports.obtenerRecetaById=(req,res)=>{
    const id=req.params.id;
    model.findById(id,(err,data)=>{
        if(err){
            res.send('receta no encontrada!')
        }else{
        
            res.send([data])
        }
    });
}

exports.editarReceta=(req,res)=>{
    const {id}=req.params;
    const newBody=req.body;
    if(req.file && req.file.filename){
        newBody.image=req.file.filename;
        
    }
    model.updateOne({_id:parseId(id)},newBody,(err,docs)=>{
        if(err){
            res.status(404).send({receta:"no encontrada"})
        }else{
            res.status(200).send({receta:docs})
        }
    });
}
exports.eliminarReceta=(req,res)=>{
    const {id}=req.params;
    model.deleteOne({_id:parseId(id)},(err,docs)=>{
        if(err){
            res.status(404).send({receta:"no encontrada"})
        }else{
            res.status(200).send({receta:"eliminada correctamente"+docs})
        }
    })
}