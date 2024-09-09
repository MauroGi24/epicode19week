import Author from '../models/authorSchema.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser =  async (request, response) => {
    const existUser = await Author.findOne({email: request.body.email})
    if (existUser) return response.status(400).send(`Esiste già un utente registrato con questa email`)
    const user = new Author ({
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        password: await bcrypt.hash(request.body.password, 10),
        birthDate: request.body.birthDate,
        avatar: request.file ? request.file.path : "https://fakeimg.pl/50x50/ffffff/?text=Avatar",
        verifiedAt: new Date()
    })
    const createdUser = await user.save()
    response.send(createdUser)
}

export const login = async (request, response) => {
    const user = await Author.findOne({email: request.body.email}).select('+password') // select mi fa prendere anche il campo password perchè nello schema è stata impostata a false
    if(!user) return response.status(401).send('Credenziali incorrette')
    if(!(await bcrypt.compare(request.body.password, user.password))){
        return response.status(401).send('Credenziali incorrette')
    }
    jwt.sign(
        {authorId: user.id},
        process.env.JWT_SECRET,
        {
            expiresIn: '12h'
        },
        (err, jwtToken) =>{
            if (err) return response.status(401).send();
            return response.send({
                token: jwtToken
            })
        }
    )
}
export const profile = async(request, response) =>{
    response.send(request.loggedUser)
}





