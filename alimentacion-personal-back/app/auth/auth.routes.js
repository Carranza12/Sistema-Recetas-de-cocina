const users= require("./auth.controller");
const express=require("express");
const router=express.Router();
const path="auth";

   router.post(`/${path}/register`,users.createUser);
   router.post(`/${path}/login`,users.loginUser);
  
module.exports=router;