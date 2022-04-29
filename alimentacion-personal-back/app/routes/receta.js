const express=require("express");
const router=express.Router();
const controller=require("../controllers/receta")

const path="recetas";

router.get(`/${path}`,controller.obtenerRecetas);

router.get(`/${path}/:id`,controller.obtenerRecetaById);

router.post(`/${path}`,controller.fileUpload,controller.crearReceta)

router.put(`/${path}/:id`,controller.fileUpload,controller.editarReceta)



router.delete(`/${path}/:id`,controller.eliminarReceta)
module.exports=router