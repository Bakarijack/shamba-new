const path = require('path')
const bcrypt = require('bcryptjs')
const userModal = require('../models/user.models')
const db_creation = require('../models/db_creation')
const con = require('../config/db_connection')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sbvidsvuibdsbvdsibvuidksvjdksuciv@423sbdbvodsb'
const landModal = require('../models/lands.model')



exports.register_landProcess =async (req, res, next) => {
    const {owner_name,id_num,land_num,title_num,doc_file,date_of_issue,map_num,land_size, token, country,city,street} = req.body


    try{
        const data = jwt.verify(token, JWT_SECRET)
        console.log(data)

        const location_id = await landModal.getLocation(country,city,street)
        console.log(location_id)

        const result = await landModal.registerLand(owner_name,data.user_id,id_num,land_num,title_num,doc_file,date_of_issue,map_num,land_size,location_id)
        console.log(result)
        return res.json({ 'status': 'ok', 'message': 'Land successfully registered'})

    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message':'Something went wrong. Try again', 'e': '1'})
    }
}


exports.update_td_verification = async (req, res, next) => {
    const { tId, token} = req.body

    console.log(tId)
    console.log(token)

    try{
        const user = jwt.verify(token, JWT_SECRET)
        console.log(user)

        const title_deed_data = await landModal.getTittleDeedData(tId)
        console.log(title_deed_data)

        const owner_data = await userModal.getOwnerEmail(title_deed_data.added_by)
        console.log(owner_data.email)
        // add to smart contract
        

        // update database
        const rlst = await landModal.update_verification(title_deed_data.title_deed_id)
        console.log(rlst)
        
        return res.json({'status': 'ok', 'message': 'data received'})
    }catch(e){
        console.log(e)
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again'})
    } 
}


exports.transferLandOwnership = async (req, res, next) => {
    console.log(req.body)
    const {title_num,new_owner_name,new_owner_email,witness_name,witness_email,signed_agreement,date_of_transfer,token} = req.body

    try{
        const user = jwt.verify(token,JWT_SECRET)

        // verify title deed number
        const t = await landModal.verifyOwnerTitle(title_num,user.user_id)

        if (t === 0){
            return res.json({ 'status': 'error', 'message': 'Title deed cannot be found'})
        }

        //get the title deed id
        const tid =  await landModal.getTittleDeedId(title_num,user.user_id)
        console.log(tid.title_deed_id)

       
        const result = await landModal.setTransferOwnershipDetails(new_owner_name,new_owner_email,user.user_id,witness_name,witness_email,date_of_transfer,tid.title_deed_id, signed_agreement)
        return res.json({'status': 'ok', 'message': 'Transferred successfully'})
    }catch(e){
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again'})
    }
    
}


exports.deleteTitle = async (req, res, next) => {
    console.log(req.body)
    const { title_deed_id } = req.body

    try{
        const result = await landModal.deleteUserTitle(title_deed_id)
        return res.json({'status': 'ok', 'message': 'Successfully deleted'})
    }catch(e){
        return res.json({ 'status': 'error', 'message': 'Something went wrong. Try again'})
    }
}