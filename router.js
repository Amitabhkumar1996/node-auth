const router = require('express').Router()
const con = require('./db')

router.post('/register',(req, res)=>{
    const { fname, lname, email, phone, password, password2} = req.body
    let message = ""
    if(password!=password2){
        message = "passwords must be same"
        res.status(400)
        res.json({ fname, lname, email, phone, password, password2, message })
        res.send()
    }
    else{
        let q = `SELECT * FROM user WHERE email = '${email}' OR phone = '${phone}'`
        con.query(q,(err, rows)=>{
            if(err) {
                message = "something went wrong"
                console.log(err)
                res.status(400)
                res.json({ fname, lname, email, phone, password, password2, message })
                res.send() 
            }
            else if(typeof rows[0]!='undefined'){
                message = "email or phone number already exists"
                res.status(400)
                res.json({ fname, lname, email, phone, password, password2, message })
                res.send()
            }
            else{
                q = `INSERT INTO user VALUES('${fname}','${lname}','${email}','${phone}','${password}')`    
                con.query(q,(err,result)=>{
                    if(err) {
                        console.log(err)
                        message = "something went wrong"
                        res.status(400)
                        res.json({ fname, lname, email, phone, password, password2, message })
                        res.send() 
                    }
                    else{
                        message = "successfully registered"
                        res.status(200)
                        res.json({ fname, lname, email, phone, password, password2, message })
                        res.send()
                    }
                })
            }
        })
    }
    
})

router.post('/login',(req, res)=>{
    const { email, password } = req.body
    let message = ""
    let q = `SELECT * FROM user WHERE email = '${email}'`
    con.query(q, (err, rows)=>{
        if(err) {
            console.log(err)
            message = "something went wrong"
            res.status(400)
            res.json({ message })
            res.send() 
        }
        else if(typeof rows[0]=='undefined'){
            message = "email doesn't exists"
            res.status(400)
            res.json({ message })
            res.send()
        }
        else if(rows[0].password!=password){
            message = "password doesn't match"
            res.status(400)
            res.json({ message })
            res.send()
        }
        else{
            message = "successfully login"
            res.status(200)
            res.json({ message })
            res.send()

        }
    })
})
module.exports = router