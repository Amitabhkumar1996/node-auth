const mysql = require('mysql')
const con =  mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Amit@12345',
    database: 'auth'
})
con.connect((err)=>{
    if(err) console.log(err)
})

module.exports = con