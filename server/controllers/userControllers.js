const HttpError = require("../models/errorModel")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')

/*============== REGISTRAR UN NUEVO USUARIO =======================*/
//POST: api/users/register
//DESPROTEJIDA
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body
        if(!name || !email || !password) {
            return next(new HttpError("Fill in all fields"))
        }
        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Email already exists", 422))
        }

        if((password.trim()).length < 6 ) {
            return next(new HttpError("Password should be al least 6 characters", 422))
        }

        if(password != password2){
            return next(new HttpError("Password do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({name, email: newEmail, password: hashedPass})

        res.status(201).json(`New User ${newUser.email} registered.`)

    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}




/*============== LOGUEAR UN NUEVO USUARIO =======================*/
//POST: api/users/login
//DESPROTEJIDA
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(HttpError("Invalid credentials", 422))
        }

        const comparePasswords = await bcrypt.compare(password, user.password)
        if(!comparePasswords) {
            return next(new HttpError("Invalids credentials", 422))
        }

        const {_id: id, name} = user
        const token = JWT.sign({id, name}, process.env.JWT_SECRET)

        res.status(200).json({token, id, name})
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials", 422))
    }
}




/*============== PERFIL DEL USUARIO =======================*/
//GET: api/users/:id
//PROTEJIDA
const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id).select("-password")  //.select("-password") para que no incluya la contraseña cuando pedimos el id
        if(!user) {
            return next(new HttpError("User not found", 422))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error))
    }
}




/*============== CAMBIAR FOTO DE PERFIL DEL USUARIO =======================*/
//POST: api/users/change-avatar
//PROTEJIDA
const changeAvatar = async (req, res) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Please choose an image", 422))
        }

        //Find user from database
        const user = await User.findById(req.user.id)
        //delete old avart ir exists
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files
        //check de file size
        if(avatar.size > 500000) {
            return next(new HttpError("Profile picture too big. Should be less tha 500kb"), 422)
        }

        let fileName;

        fileName = avatar.name
        let splittedFileName = fileName.split('.')
        let newFIleName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length -1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFIleName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFIleName}, {new: true})
            if(!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 422))
            }
            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}





/*============== EDITAR DETALLE DE USUARIO (userdetail) =======================*/
//PATCH: api/users/edit-user
//PROTEJIDA
const editUser = async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body
        if(!name || !email || !currentPassword || !newPassword ) {
            return next(new HttpError("Fill in all fields", 422))
        }

        //get user from database
        const user = await User.findById(req.user.id);
        if(!user) {
            return next(new HttpError("User not found", 403))
        }

        //make sure new email doesn't already exist
        const emailExists = await User.findOne({email})
        //queremos actualizar otros detalles sin cambiar el correo electrónico (que es una identificación única porque la usamos para iniciar sesión)
        if(emailExists && (emailExists._id != req.user.id)) {
            return next(new HttpError("Email already exist", 422))
        }
        //comparar current password con la db password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
        if(!validateUserPassword) {
            return next(new HttpError("Invalid current password", 422))
        }

        //comparar new password
        if(newPassword != confirmNewPassword) {
            return next(new HttpError("New password do not match", 422))
        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        //update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}



/*============== OBTENER AUTORES =======================*/
//GET: api/users/authors
//DESPROTEJIDA
const getAuthors = async (req, res) => {
    try {
        const authors = await User.find().select('-password')
        res.status(200).json(authors)
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}