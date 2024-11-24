import express, {urlencoded} from 'express'
import cors from 'cors'

import client from './scr/common/db.js'
import peliculasRoutes from './scr/pelicula/peliculaRouter.js'
import actorRoutes from './scr/actor/actorRouter.js'

const PORTS = 3000 || 3001
const app = express()
//config de middleworks (auno no se que significa)
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

//ruta por defecto
app.all('/',(req,res) => {return res.status(200).send('Bienvenido al cine2')})
app.use('/api', peliculasRoutes)
app.use('/api', actorRoutes)

await client.connect()
.then(() => {
    console.log('conectado al cluster')
    app.listen(PORTS,() => {console.log(`servidor corriendo en http://localhost:${PORTS}`)})

})
.catch(() =>{
    console.log('error de coneccion al cluster')
})
