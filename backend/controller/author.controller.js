import Author from '../models/authorSchema.js'

export const authors = async (request, response) =>{
    const page = request.query.page
    const perPage = request.query.perPage
    const authors = await Author.find({}).sort({name: 1, surname: 1}).skip((page - 1) * perPage).limit(perPage)
    response.send(authors)
}

export const singleAuthor = async (request, response) =>{
    const id = request.params.id
    try {
        const author = await Author.findById(id)
        response.send(author)
    }
    catch(error) {
        response.status(404).send({message: `L'autore non esiste o è stato cancellato`})
    }
}

export const newAuthor =  async (request, response) =>{
    const author = new Author ({...request.body, avatar: request.file.path})
    try{
        const createdAuthor = await author.save()
        response.status(201).send(createdAuthor)
    }
    catch(error) {
        response.status(400).send({message: 'Ricontrolla i dati'})
    }
}

export const updateAuthor = async (request, response) => {
    const id = request.params.id
    const modifiedAuthor = request.body
    try{
        const newAuthor = await Author.findByIdAndUpdate(id, modifiedAuthor)
        response.send(newAuthor)}
     catch(error) {
        response.status(400).send({message: `Errore nella modifica dell'autore`})
     }
    }

export const changeAvatar = async (request, response) => {
    const id =request.params.authorId
    try {
        const avatarAuthor = await Author.findByIdAndUpdate(id, {avatar: request.file.path}, {new:true})
        response.status(200).send(avatarAuthor)
    } catch (error) {
        response.status(400).send({message: `Impossibile modificare l'immagine`})
    }
}

export const deleteAuthor = async (request, response) => {
    const id = request.params.id
    try{
        const removeAuthor = await Author.findByIdAndDelete(id)
        response.send(removeAuthor)
    }
    catch(error) {
        response.status(400).send({message: `Impossibile rimuovere l'autore`})
    }
}