const express = require("express");
const app = express();
const cors=require("cors");
const recetas=require("./app/routes/receta")
const port =3001;
const initDB=require("./config/db")
const recetaRouters=require("./app/routes/receta")
const authRouters=require('./app/auth/auth.routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(recetaRouters)

app.use(authRouters);

app.use(express.static("./app/uploads"));


app.listen(port,()=>{
    console.log("funcionando xd");
})


initDB();