import Comment from "../models/commentSchema.js"

export const createComment = async (request, response)=>{   
    const id = request.params.id
    const comment = request.body
    try {
        const addComment = new Comment ({...comment, post: id})
        const createdComment = await addComment.save()
        response.status(200).send(createdComment)
    } catch (error) {
        response.status(400).send({message: 'Impossibile aggiungere il commento'})
    }  
}

export const comments = async (request, response)=> {
    const id = request.params.id
    try {
        const comments = await Comment.find({post: id}).populate('post').populate('author')
        response.send({
            data: comments,
        })
    } catch (error) {
        response.status(404).send({message: 'Non ci sono commenti'})
    }  
}

export const singleComment = async (request, response) => {
    const postId = request.params.postId
    const commentId = request.params.commentId
    try{
        const comment = await Comment.findOne({post: postId, _id: commentId})
        response.send(comment)
    }
    catch(error){
        response.status(404).send({message: 'Il commento non esiste o è stato cancellato'})
    }
}

export const editComment = async (request, response) => {
    const commentId = request.params.commentId
    const postId = request.params.postId
    const newComment = request.body
    try{
        const modifiedComment = await Comment.findOneAndUpdate(
            {post: postId, _id: commentId},
            {$set: newComment},
            {new: true}
        )
        response.send(modifiedComment)
    }
    catch(error){
        response.status(400).send({message: 'Impossibile modificare il commento'})
    }
}
 
export const deleteComment = async (request, response) => {
    const commentId = request.params.commentId
    const postId = request.params.postId
    const newComment = request.body
    try{
        const deleteComment = await Comment.findOneAndDelete({post: postId, _id: commentId})
        response.send(deleteComment)
    }
    catch(error){
        response.status(400).send({message: 'Impossibile eliminare il commento'})
    }
}