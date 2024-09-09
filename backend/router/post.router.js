import express from 'express'
import uploadImage from '../middleware/uploadImg.js'
import { allPosts, changeImg, createPost, deletePost, singlePost, updatePost } from '../controller/post.controller.js'
import { createComment, comments, singleComment, editComment, deleteComment} from '../controller/comment.controller.js'


const postRouter = express.Router()

postRouter.get('/', allPosts)
postRouter.get('/:id', singlePost)
postRouter.post('/', uploadImage.single('cover'), createPost)
postRouter.patch('/:postId/cover', uploadImage.single('cover'), changeImg)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)


postRouter.post('/:postId/comments', createComment )
postRouter.get('/:postId/comments', comments)
postRouter.get('/:postId/comments/:commentId', singleComment)
postRouter.put('/:postId/comment/:commentId', editComment)
postRouter.delete('/:postId/comment/:commentId', deleteComment)

export default postRouter