const con = require('../config/db_connection')

exports.create_db = () => {
    con.connect(function(err) {
        if (err){
            throw err
        }else{
            console.log("Connected!");
            con.query("CREATE DATABASE IF NOT EXISTS shamba", function (err, result) {
            if (err){
                throw err
            }
            console.log('database created')
        });
        }
        
    });
}
