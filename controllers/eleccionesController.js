import Eleccion from "../models/Eleccion.js";

export const createEleccion = async (req,res,next) => {
    const newEleccion = new Eleccion(req.body);
    try {
        const saved = await newEleccion.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateEleccion = async (req,res)=>{
    try {
        const eleccion = await Eleccion.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(eleccion);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const getEleccion = async (req,res)=>{
    try {
        const all = await Eleccion.find();
        res.status(200).json(all);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const getEleccionById = async (req,res)=>{
    try {
        const eleccion = await Eleccion.findById(req.params.id);
        res.status(eleccion?200:400).json(eleccion?eleccion:{});
    } catch (error) {
        res.status(500).json({"message":error.message});
    }
}
export const deleteEleccionById = async (req,res)=>{
    try {
        await Eleccion.findByIdAndDelete(req.params.id)
        res.status(200).json({"mensaje":"Eliminado con éxito"});
    } catch (error) {
        res.status(500).json(error);
    }
}