const {Router} = require('express')
const {createPost, editPost, deletePost, getCategoryPosts, getPost, getPosts, getUsersPost} = require('../controllers/postControllers')
const authMiddleware = require ('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleware, createPost)
router.get('/:id', getPost)
router.get('/', getPosts)
router.patch('/:id', authMiddleware, editPost)
router.get('/categories/:category', getCategoryPosts)
router.get('/users/:id', getUsersPost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router