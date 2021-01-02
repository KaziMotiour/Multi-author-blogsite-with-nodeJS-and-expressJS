const {Schema, model} = require('mongoose')
const Comment = require('./Comments');

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:100,
    },
    body:{
        type:String,
        required:true,
        
        
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
        
    },
    tags:{
        type:[String],
        required:true
    },
    thumbnail:String,
    readTime:String,
    likes:[Schema.Types.ObjectId],
    dislike:[Schema.Types.ObjectId],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:Comment
        }
    ],

},{
    timestamps:true
})


const Post = model('Post', postSchema)

module.exports = Post