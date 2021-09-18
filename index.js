const params = require('./src/constants/constant')
const controllers = require('./src/controllers/controller')
let connection = require('./src/connection/connection')
const express = require('express')
const multer = require('multer')
const app = express()
const bodyParser = require('body-parser')
const path = require("path")

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function(req, res){
  res.send('Welcome to GKINDIALOGISTICS backened >>')
})
app.post('/userlist', controllers.getUserlist)
app.post('/getallparcel', controllers.getallparcel)
app.post('/searchparcel', controllers.searchparcel)
app.post('/updateparcel', controllers.updateparcel)
app.post('/adminlogin', controllers.adminLogin)
app.post('/generateparcel', controllers.generateparcel)

let port =  process.env.PORT || params.port
app.listen( port, async () => {
  connection.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );
  console.log(`app listening at http://localhost:` + port)
})
