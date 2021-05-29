const params = require('./src/constants/constant')
const controllers = require('./src/controllers/controller')
let connection = require('./src/connection/connection')
const express = require('express')
const app = express()
app.get('/', function(req, res){
  res.send('aaaaaaaaaaaa')
})
app.post('/getnewuser', controllers.getnewuserController)

app.listen(params.port, async () => {
  connection.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );
  console.log(`app listening at http://localhost:` + params.port)
})
