const express = require('express')
const app = express()

const router = require('./router')

app.use(express.json())
app.use('/', router)
app.listen(3001, ()=>{
    console.log('server listening on port 3001...')
})

/*create table user(fname varchar(20) not null, lname varchar(20) not null, email varchar(35) not null unique, phone char(10) not null, password varchar(50) not null,primary key (phone));*/