import {ObjectId} from 'mongodb'
import client from '../common/db.js'
import { Actor } from './actor.js'





const actorCollection =client.db('cine-db').collection('actores')
const peliculaCollection=client.db('cine-db').collection('peliculas')

async function handleInsertActorRequest(req, res) {
    let data = req.body;

    // Crear un nuevo objeto para el actor
    let actor = {
        idPelicula: data.idPelicula,
        nombre: data.nombre,
        edad: data.edad,
        estaRetirado: data.estaRetirado,
        premios: data.premios,
    };

    try {
        // Verificar si  existe
        const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(data.idPelicula) });

        if (!pelicula) {
            // Si la película no existe, error 400
            return res.status(400).send({ error: 'La película no existe' });
        }

        // Insertar el actor en la colección
        const result = await actorCollection.insertOne(actor);

        if (!result.insertedId) {
            // Si el actor no fue insertado, retornar un error 400
            return res.status(400).send('Error al guardar el actor');
        } else {
            // Retornar un estado 201 con el ID del actor insertado
            return res.status(201).send({ insertedId: result.insertedId });
        }
    } catch (e) {
        // Manejar cualquier otro error
        return res.status(500).send({ error: e.message });
    }
}
    

async function handlegetActoresRequest(req,res) {
    await actorCollection.find({}).toArray()
    .then((data) => {return res.status(200).send(data)})
    .catch((e) =>{return res.status(500).send(e)})

    
}

async function handleGetActorByIdRequest(req,res) {
    let id = req.params.id
    
    try{
        let oid =ObjectId.createFromHexString(id)
        await actorCollection.findOne({_id:oid})
        .then((data) =>{
            if(data === null) return res.status(404).send(data)
                return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(200).send({error:e.code})
        })
    }
    catch(e){
        return res.status(500).send({error:e.code})
    }

    
}

async function HandleGetActoresByPeliculaRequest(req, res) {
    let id = req.params.id


    try {
        let oid = ObjectId.createFromHexString(id)

        // Buscar la película usando el ObjectId
       await peliculaCollection.findOne({ _id:oid })
       .then((data)=>{
        if(data=== null)return res.status(400).send('id de pelicula no encontrado')
       })
              // Buscar actores asociados a la película
        const actores = await actorCollection.find({ idPelicula: id }).toArray();

        // Verificar si se encontraron actores
        if (actores.length === 0) {
            return res.status(404).send({ error: 'No se encontraron actores para esta película' });
        }

        // Retornar la lista de actores
        return res.status(200).send(actores);
    } catch (e) {
        // Manejar cualquier otro error
        return res.status(500).send({ error: e.message });
    }
}



export default{
    handleInsertActorRequest,
    handlegetActoresRequest,
    handleGetActorByIdRequest,
    HandleGetActoresByPeliculaRequest,

}