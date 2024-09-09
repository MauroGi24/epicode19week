import 'dotenv/config'
import jwt from 'jsonwebtoken'
import Author from '../models/authorSchema.js'


export default (request, response, next) =>{
    if (!request.headers.authorization) return response.status(401).send({message: 'Utente non autorizzato'});
    const parts = request.headers.authorization.split(' ');
    if (parts.length !=2) return response.status(401).send({message: 'Utente non autorizzato'});
    if(parts[0] !='Bearer') return response.status(401).send({message: 'Utente non autorizzato'});
    const jwtToken= parts[1];
    jwt.verify(jwtToken, process.env.JWT_SECRET, async(err, payload)=>{
        if (err) return response.status(401).send({message: 'Utente non autorizzato'});
        const user = await Author.findById(payload.authorId)//.select('-password') per escludere la password se non lo fai dallo schema;
        if (!user) return response.status(401).send({message: `L'account è stato eliminato`});
        request.loggedUser = user
        next()
    })
}


