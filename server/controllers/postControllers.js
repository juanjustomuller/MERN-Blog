const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')
const { Http2ServerRequest } = require('http2')


/*=======================CREATE A POST ==================================*/
//POST: api/posts
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body
        if(!title || !category || !description || !req.files) {
            return next(new HttpError("Fill in all fields and choose thumbnail", 422))
        }
        const {thumbnail} = req.files
        //check the file size
        if(thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should br less than 2mb"))
        }
        let fileName = thumbnail.name;
        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length -1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({title, category, description, thumbnail: newFileName,
                    creator: req.user.id
                })
                if(!newPost) {
                    return next(new HttpError("Post couldn't be created", 422))
                }
                //Find User and incrate post count by 1
                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser.posts + 1
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                
                res.status(200).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}




/*=======================GET ALL POST ==================================*/
//GET: api/posts
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})  //updatedAt: -1 para que traiga los mas nuevos primero
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}





/*=======================GET A SINGLE POST ==================================*/
//GET: api/posts/:id
const getPost = async (req, res, next) => {
    try {
        const postId  = req.params.id
        const post = await Post.findById(postId)
        if(!post) {
            return next(new HttpError("Post not found", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}








/*=======================GET POST BY CATEGORY ==================================*/
//GET: api/posts/categories/:category
const getCategoryPosts = async (req, res, next) => {
    try {
        const {category} = req.params
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}






/*=======================GET POST BY Author ==================================*/
//GET: api/posts/users/:id
const getUsersPost = async (req, res, next) => {
    try {
        const {id} = req.params
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}





/*=======================EDIT POST ==================================*/
// PATCH: api/posts/:id
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFileName;
        let updatedPost;
        const postId = req.params.id;
        let { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields", 422));
        }

        // Get old post from database
        const oldPost = await Post.findById(postId);
        if (req.user.id == oldPost.creator) {
            if (!req.files) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
            } else {
                // Delete old thumbnail from upload
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                    if (err) {
                        return next(new HttpError(err));
                    }
                });

                // Upload new thumbnail
                const { thumbnail } = req.files;

                // Check file size
                if (thumbnail.size > 2000000) {
                    return next(new HttpError("Thumbnail too big. Should be less than 2mb"));
                }

                fileName = thumbnail.name;
                let splittedFileName = fileName.split('.');
                newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1];

                await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
                    if (err) {
                        return next(new HttpError(err));
                    }
                });

                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFileName }, { new: true });
            }
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update post", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error));
    }
}





/*=======================DELETE POST ==================================*/
//DELETE: api/posts/:id
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        if(!postId) {
            return next(new HttpError("Post unvialible", 400))
        }
        const post = await Post.findById(postId)
        const fileName = post?.thumbnail;
        if(req.user.id == post.creator) {
        //delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                await Post.findByIdAndDelete(postId)
                // find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser?.posts -1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.json(`Post ${postId} deleted succesfully`)
            }
        })
    } else {
        return next(new HttpError("Post couldn't be deleted", 403))
    }
    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = {createPost, editPost, deletePost, getCategoryPosts, getPost, getPosts, getUsersPost}