import express from 'express'
import { login, register } from '../controllers/auth.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/verifyToken",verifyToken);
router.get("/editar/:id",verifyUser,(req,res,next)=>{
    res.json({mensaje:"Hola soy el editar"});

});


export default router;