const user= require('./auth.dao');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema= require('./auth.model')
const SECRET_KEY='secretkey123456';

exports.createUser=(req,res,next)=>{
    const newUser={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),
        peso:req.body.peso,
        estatura:req.body.estatura,
        edad:req.body.edad,
        objetivo:req.body.objetivo,
    }

    user.create(newUser, (err,user)=>{
        if(err && err.code===11000) return res.status(409).send('Email ya existente!')
        if(err) return res.status(500).send('server error');
        const expiresIn=24*60*60;
        const accessToken=jwt.sign({id:user.id},
            SECRET_KEY,{
                expiresIn:expiresIn
            });
            const dataUser={
                name:user.name,
                email:user.email,
                accessToken:accessToken,
                expiresIn:expiresIn
            }
            //response 
            res.send({dataUser});
    })
}

exports.loginUser=(req,res,next)=>{
    const userData={
        email:req.body.email,
        password:req.body.password
    }
    user.findOne({email:userData.email},(err,user)=>{
        if(err) return res.satus(500).send('server error!');
        if(!user){
            //email no existe
            res.satus(409).send({message:'algo ha salido mal!'});
        }else{
            
            const resultPassword=bcrypt.compareSync(userData.password, user.password);
            if(resultPassword){
                const expiresIn=24*60*60;
                const accessToken=jwt.sign({id:user.id}, SECRET_KEY,{expiresIn:expiresIn});
                const dataUser={
                    name:user.name,
                    email:user.email,
                    accessToken:accessToken,
                    expiresIn:expiresIn
                }
                res.send({dataUser,user});
                console.log(user)
            }else{
                //password incorrecta
                res.status(409).send({message:'algo ha salido mal!'});
            }
        }
    })

   
}