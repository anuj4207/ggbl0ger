const express = require('express')
const router = express.Router()
const authenticationMiddleware = require('../middleware/auth')
const {createLogin,createSignin,createBlogPost,getMyPost,updateBlog,deleteBlog} = require('../controllers/blog_route_controller')
router.route('/login').post(createLogin)
router.route('/signin').post(createSignin)
router.route('/post').post(authenticationMiddleware,createBlogPost).get(authenticationMiddleware,getMyPost)
router.route('/crud/:id').patch(authenticationMiddleware,updateBlog).delete(authenticationMiddleware,deleteBlog)
router.route('/create').post(authenticationMiddleware,createBlogPost)
//router.route('/create/:u').get(getMyPost)
//router.route('/allpost').get(getAllPost)
// router.route('/register').post(createSignIn).get(getRegisterCred)
// router.route('/create').post(createPost)
// router.route('/seepost').get(getAllPost)
module.exports = router