const mongoose = require('mongoose')

const blogLoginSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide Username'],
        maxLength:[10,'Dont exceed']
    },
    password:{
        type:String,
        required:[true,'Please provide Password']
    }
})

const blogSigninSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide Username'],
        maxLength:[10,'Dont exceed']
    },
    email:{
        type:String,
        required:[true,'Please provide Email']
    },   
    password:{
        type:String,
        required:[true,'Please provide Password']
    }
})

const blogNewPost = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Inavlid User']
    },
    title:{
        type:String
    },
    blog:{
        type:String
    },
    img:{
        type:String
    },
    tag:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const createBlog = mongoose.model('MyBlogPost',blogNewPost)
const signIn = mongoose.model('BlogSingIn',blogSigninSchema)
const logIn  = mongoose.model('BlogLogIn',blogLoginSchema)
module.exports = {logIn,signIn,createBlog}