import Post from '../models/postSchema.js'
import Author from '../models/authorSchema.js'
import transport from '../services/mail.service.js'

export const allPosts = async (request, response) =>{
    const page = request.query.page
    const perPage = request.query.perPage
    const posts = await Post.find({}).sort({author: 1}).skip((page - 1) * perPage).limit(perPage)
    response.send(posts)
}

export const singlePost = async (request, response) =>{
    const id = request.params.id
    try {
        const post = await  Post.findById(id).populate('author')
        response.send(post)
    }
    catch(error) {
        response.status(404).send({message:`Il post non esiste o e stato cancellato`})
    }
}

export const createPost =  async (request, response) =>{
    const post = new Post ({...request.body, cover: request.file.path, readTime: JSON.parse(request.body.readTime)})
    let newPost
    try{
        newPost = await post.save()
        response.status(201).send(newPost)
    }
    catch(error) {
        return response.status(400).send({message: 'Ricontrolla i dati'})
    }
    try {
        const author = await Author.findById(newPost.author)
        await transport.sendMail({
            from: 'noreply@epicode.com',
            to: author.email, 
            subject: "Hai pubblicato un nuovo post", 
            text: "Hai pubblicato un nuovo post", 
            html: "<b>Hai pubblicato un nuovo post</b>"
        })
    } catch (error) {
    }
    
}

export const changeImg = async (request, response)=>{
    const id = request.params.postId
    try {
        const img = await Post.findByIdAndUpdate(id, {cover: request.file.path}, {new:true})
        response.status(200).send(Post)
    } catch (error) {
        response.status(400).send({message: `Impossibile modificare l'immagine`})
    }
}

export const updatePost = async (request, response) => {
    const id = request.params.id
    const modifiedPost = request.body
    try{
        const newPost = await Post.findByIdAndUpdate(id, {new:true}) 
        response.send(newPost)
    }
    catch(error){
        response.status(400).send({message: "Errore nella modifica del post"})
    }}
    

export const deletePost = async (request, response) => {
        const id = request.params.id
        try{
            const removePost = await Post.findByIdAndDelete(id)
            response.send(removePost)
        }
        catch(error) {
            response.status(400).send({message: 'Impossibile rimuovere il post'})
        }
    }