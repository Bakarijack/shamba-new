const con = require('../config/db_connection')
const db_creation = require('./db_creation')



exports.getPostedLands = async () => {
    const rows = await con.promise().query(`SELECT * FROM title_deed WHERE 1`)
    console.log('row data = ',rows[0])

    return rows[0]
}


exports.registerLand = async (owner_name,added_by, id_num, land_num, title_num,doc_file, date_of_issue, map_num, land_size, location_id) => {
    const row = await con.promise().query(`INSERT INTO title_deed (owner,added_by,id,land_num,date_of_issue,title_num,legal_doc,map_num,land_size,location_id) 
    VALUES ('${owner_name}', '${added_by}', '${id_num}','${land_num}', '${date_of_issue}','${title_num}','${doc_file}','${map_num}','${land_size}','${location_id}')`)
    console.log(row)
    
    return row
}

exports.getLocation = async (country,city,street) => {
    const rows = await con.promise().query(`SELECT * FROM location WHERE country='${country}' AND city='${city}' AND street='${street}'`)
    // let total = rows[0][0].total

    if (rows[0].length === 0){
        const result = await con.promise().query(`INSERT INTO location (country,city,street) VALUES ('${country}','${city}','${street}')`)

        const data = await con.promise().query(`SELECT location_id FROM location WHERE country ='${country}' AND city ='${city}' AND street='${street}'`)

        return data[0][0].location_id
    }else if (rows[0].length > 0){
        return rows[0][0].location_id
    }

}


exports.update_verification = async (title_deed_id) => {
    const result = await con.promise().query(`UPDATE title_deed SET is_verified ='1' WHERE title_deed_id = '${title_deed_id}'`)

    console.log(result)

    return result
}

exports.getTittleDeedData = async title_deed_id => {
    const rows = await con.promise().query(`SELECT * FROM title_deed WHERE title_deed_id = '${title_deed_id}'`)
    console.log("row data = ",rows[0][0])

    return rows[0][0]
}


exports.getUserPostedLands = async userId => {
    const rows = await con.promise().query(`SELECT * FROM title_deed WHERE added_by='${userId}' AND user_delete ='0'`)
    console.log('row data = ',rows[0])

    return rows[0]
}

exports.setTransferOwnershipDetails = async (new_owner_name,new_owner_email,previus_owner,witness_name,witness_email,date_of_transfer,title_id, agreement_doc) => {
    const row = await con.promise().query(`INSERT INTO land_transfer (new_owner_name, previous_owner, new_owner_email, witness_name, witness_email, date_of_transfer, title_id, agreement_doc)
     VALUES ('${new_owner_name}','${previus_owner}','${new_owner_email}','${witness_name}','${witness_email}','${date_of_transfer}','${title_id}','${agreement_doc}')`)
    console.log(row)
    
    return row
}


exports.verifyOwnerTitle = async (t_num,userId) => {
    const rows = await con.promise().query(`SELECT COUNT(*) as total FROM title_deed WHERE added_by = '${userId}' AND title_num = '${t_num}'`)
    let total = rows[0][0].total

    return total
}


exports.getTittleDeedId = async (t_num,userId) => {
    const rows = await con.promise().query(`SELECT title_deed_id FROM title_deed WHERE added_by='${userId}' AND title_num = '${t_num}'`)
    console.log('row data = ',rows[0])

    return rows[0][0]
}


exports.deleteUserTitle = async (title_deed_id) =>{
    const result = await con.promise().query(`UPDATE title_deed SET user_delete ='1' WHERE title_deed_id = '${title_deed_id}'`)

    console.log(result)

    return result
}