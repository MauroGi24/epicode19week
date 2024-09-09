import {model, Schema} from 'mongoose'

const commentSchema = new Schema(
    {
        content: {
            type: String,
            minLength: 2,
            maxLength: 200,
            required: true,
            trim: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
        },
    },
    {collection: "comments",
        timestamps: true,
    }
)
export default model("Comment", commentSchema)