const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModels.js')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)

})

const createTareas = asyncHandler(async (req, res) => {
    if(!req.body.descripcion){
        res.status(400)
        throw new Error('Debes teclear una descripcion de la tarea')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion
    })

    res.status(201).json(tarea)

})



const updateTareas = asyncHandler(async (req, res) => {
    //primero verificamos que la tarea exista
    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(404)
        throw new Error('Tarea especificada no existe')
    }

    const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedTarea)
})

const deleteTareas = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(404)
        throw new Error('Tarea especificada no existe')
    }
    await Tarea.deleteOne(tarea)

    res.status(200).json({id: req.params.id})
})
module.exports = {getTareas, createTareas, updateTareas, deleteTareas}