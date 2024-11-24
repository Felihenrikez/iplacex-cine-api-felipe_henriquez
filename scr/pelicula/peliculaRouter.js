import express from 'express'
import controller from './controller.js'

const peliculasRoutes = express.Router()
peliculasRoutes.post('/pelicula', controller.handleInsertPeliculaRequest)
peliculasRoutes.get('/peliculas', controller.handleGetPeliculasRequest)
peliculasRoutes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)
peliculasRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaRequest)
peliculasRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest)

export default peliculasRoutes