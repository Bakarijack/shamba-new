const path = require('path')
const bcrypt = require('bcryptjs')
const userModal = require('../models/user.models')
const db_creation = require('../models/db_creation')
const con = require('../config/db_connection')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sbvidsvuibdsbvdsibvuidksvjdksuciv@423sbdbvodsb'

exports.signupProcess = async (req, res, next) => {
    console.log(req.body)
    const { username, user_email, password: passPlainText, c_password} = req.body

    if (passPlainText !== c_password){
        return res.json({ 'status': 'error', 'message': 'Passwords not match'})
    } 
1 
    if (passPlainText.length < 8){
        return res.json({ 'status': 'error', 'message': '8 digit character password required'})
    }

    // check if the username is taken
    try{
        const result = await userModal.is_usernameTaken(username)
        console.log(result)
        if (result > 0){
            return res.json({ 'status': 'error', 'message': 'Username already taken. Try another one'})
        }
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '1'})
    }

    // check if the user exist
    try{
        const result = await userModal.is_userExist(user_email)
        console.log(result)

        if (result > 0){
            return res.json({ 'status': 'error', 'message': 'User exist. Try to login'})
        }
    }catch(err){
        console.log(err)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '2'})
    }

    const password = await bcrypt.hash(passPlainText, 10)
    console.log(password)

    // add the user in the database
    try{
        const user = await userModal.addUser(username, user_email, password)
        return res.json({ 'status': 'ok', 'message': 'Account created successfully'})
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '3'})
    }    
}


exports.loginProcess = async (req, res, next) => {
    const { user_email, user_password } = req.body

    console.log(user_email, user_password)

    try{
        const result = await userModal.is_userExist(user_email)
        if (result === 0){
            return res.json({ 'status': 'error', 'message': 'Invalid email or password'})
        }
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '1'})
    }

    try{
        const result = await userModal.getPassword(user_email)
        console.log(result)
        if (await bcrypt.compare(user_password, result.password)){
            const token = jwt.sign({
                user_id: result.user_id,
                user_email: user_email
            }, JWT_SECRET)

            res.cookie('token',token)
            return res.json({ 'status': 'ok', 'message': 'Successfully signed', 'data': token,'role_id': result.role_id})
        }
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '2'})
    }



    res.json({ 'status': 'error', 'message': 'Invalid email or password', 'e': '1'})
}


exports.adminSignupProcess = async (req, res, next) => {
    console.log(req.body)

    const { username, user_email, password: passPlainText, c_password} = req.body

    if (passPlainText !== c_password){
        return res.json({ 'status': 'error', 'message': 'Passwords not match'})
    } 
1 
    if (passPlainText.length < 8){
        return res.json({ 'status': 'error', 'message': '8 digit character password required'})
    }

    // check if the username is taken
    try{
        const result = await userModal.is_usernameTaken(username)
        console.log(result)
        if (result > 0){
            return res.json({ 'status': 'error', 'message': 'Username already taken. Try another one'})
        }
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '1'})
    }

    // check if the user exist
    try{
        const result = await userModal.is_userExist(user_email)
        console.log(result)

        if (result > 0){
            return res.json({ 'status': 'error', 'message': 'User exist. Try to login'})
        }
    }catch(err){
        console.log(err)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '2'})
    }

    const password = await bcrypt.hash(passPlainText, 10)
    console.log(password)

    // add the user in the database
    try{
        const user = await userModal.addAdmin(username, user_email, password,1)
        return res.json({ 'status': 'ok', 'message': 'Account created successfully'})
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again', 'e': '3'})
    }    
}


exports.getCurrentUsername = async (req,res,next) => {
    const {token} = req.body

    try{
        const user = jwt.verify(token, JWT_SECRET)
        console.log(user)

        const username = await userModal.getUsername(user.user_email)
        console.log(username.username)

        return res.json({'status': 'ok', 'message': 'Data returned', 'username': username.username, 'email': user.user_email})
    }catch(e){
        return res.json({ 'status': 'error', 'message': 'Something went wrong'})
    }
}