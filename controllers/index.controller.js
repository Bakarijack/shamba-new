const userModal = require('../models/user.models')
const db_creation = require('../models/db_creation')
const con = require('../config/db_connection')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sbvidsvuibdsbvdsibvuidksvjdksuciv@423sbdbvodsb'
const landModel = require('../models/lands.model')


exports.indexPageRender = (req, res, next) => res.render('index')

exports.loginPageRender = (req, res, next) => res.render('login', { layout: 'auth'})

exports.signupPageRender = (req, res, next) => res.render('signup', { layout: 'auth'})

exports.dashboardPageRender = (req, res, next) => res.render('client_home', { layout: 'client_main' })

exports.registerLandPageRender = (req, res, next) => res.render('register_land', { layout: 'client_main' })

exports.registeredLandsList = async (req,res,next) =>{
    console.log(req.cookies.token)

    let land_list
    
    try{
        const user = jwt.verify(req.cookies.token,JWT_SECRET)
        console.log(user)

        land_list = await landModel.getUserPostedLands(user.user_id)
    }catch(e){
        console.log(e)
    }

    console.log(land_list)
    res.render('registered_lands_list', {layout: 'client_main','land_list':land_list})
}

exports.adminSignupPageRender = (req, res, next) => res.render('admin_signup', { layout: 'auth'})

exports.adminDashboardPageRender = (req, res, next) => res.render('admin_home', { layout: 'admin_main'})

exports.postedLands = async (req, res, next) =>{
    let land_list
    
    try{
        land_list = await landModel.getPostedLands()
    }catch(e){
        console.log(e)
    }

    console.log(req.cookies.token)
    console.log(land_list)
    console.log(land_list.length)

    res.render('admin_posted_lands', { layout : 'admin_main', land_list })
} 


exports.logoutPage = (req,res,next) => {
    res.clearCookie("token")
    res.redirect('/')
}

exports.tranferLandPageRender = (req, res, next) => res.render('client_transfer_land', {layout: 'client_main'})