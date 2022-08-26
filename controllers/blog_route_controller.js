const asyncWrapper = require('../middleware/async-wrapper')
const {logIn,signIn,createBlog} = require('../model/dbmodel')
const jwt = require('jsonwebtoken')

const createLogin =async(req,res)=>{
    console.log("Triggered Login cred",req.body);
    const bloginCheck = await signIn.findOne({username:req.body.username,password:req.body.password})
    if(bloginCheck){
        //const blogin = await logIn.create(req.body)
        const {_id,username} = bloginCheck
        //const id = new Date().getDate()
        const token = jwt.sign({_id,username},process.env.JWT_SECRET,{expiresIn:'1d',})
        res.status(200).json({data:bloginCheck,token:token})
    }else{
        res.status(500).json({msg:"Username not exist"})
    }
}

const createSignin = async(req,res)=>{
    console.log("Triggred Signin cred",req.body);
    const bsigninCheck = await signIn.findOne({username:req.body.username})
    if(!bsigninCheck){
        const bsignin = await signIn.create(req.body)
        res.status(201).json({data:bsignin})
    }else{
        res.status(500).json({msg:"Username already In use"})
    }
    
}

const createBlogPost = async(req,res)=>{
    const createMyBlog = await createBlog.create(req.body)
    res.status(201).json({createMyBlog})
}

const getMyPost = async(req,res)=>{
    const {username,tag,sort,fields} = req.query
    const queryObject ={};
    console.log(req.query);

    if(username){
        queryObject.username = {$regex:username,$options:'i'}
    }
    if(tag){
        queryObject.tag = {$regex:tag,$options:'i'}
    }

    let result = createBlog.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)
    const blog = await result;
    res.status(200).json({blog})
}

const updateBlog = async(req,res)=>{
    console.log("triggerd updating",req.params);
    let {id:blogID} = req.params
    blogID=blogID.split(':').join('')
    console.log(blogID);
    const updatedBlog = await createBlog.findOneAndUpdate({_id:blogID},req.body)
    res.status(201).json({updatedBlog})
}

const deleteBlog = async(req,res)=>{
    let {id:blogID} = req.params
    blogID = blogID.split(':').join('')
    console.log("triggerd deleting",blogID);
    const deletedBlog = await createBlog.findOneAndDelete({_id:blogID})
    res.status(201).json({deleteBlog})
}

module.exports = {createLogin,createSignin,createBlogPost,getMyPost,updateBlog,deleteBlog}