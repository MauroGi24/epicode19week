import express from 'express'
import { authors, changeAvatar, deleteAuthor, newAuthor, singleAuthor, updateAuthor } from '../controller/author.controller.js'
import uploadImage from '../middleware/uploadImg.js'


const authorRouter= express.Router()

authorRouter.get("/", authors)
authorRouter.get("/:id", singleAuthor) 
authorRouter.post("/", uploadImage.single('avatar'), newAuthor)
authorRouter.put("/:id", updateAuthor)
authorRouter.delete("/:id", deleteAuthor)
authorRouter.patch("/:authorId/avatar", uploadImage.single('avatar'), changeAvatar)

export default authorRouter