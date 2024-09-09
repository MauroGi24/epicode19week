import { Schema, model } from 'mongoose'

const authorSchema = new Schema(
    {
        googleId: String,
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false, // impostato a false non restituisce il campo password quando si esegue una query        

        },
        birthDate: {
            type: Date,
            required: true        
        },

        avatar: {
            type: String,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
        verifiedAt: Date,
        verificationCode: String,
    },
    {collection: "authors"}
)

export default model("Author", authorSchema)