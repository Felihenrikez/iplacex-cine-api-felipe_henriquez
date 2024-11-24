import express from 'express'
import controller from './controller.js'

const actorRoutes =express.Router()
actorRoutes.post('/actor', controller.handleInsertActorRequest)
actorRoutes.get('/actores',controller.handlegetActoresRequest)
actorRoutes.get('/actor/:id',controller.handleGetActorByIdRequest)
actorRoutes.get('/actores/:id',controller.HandleGetActoresByPeliculaRequest)

export default actorRoutes