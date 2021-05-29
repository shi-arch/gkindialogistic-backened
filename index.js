const params = require('./src/constants/constant')
const controllers = require('./src/controllers/controller')
let connection = require('./src/connection/connection')
const express = require('express')
const multer = require('multer')
const app = express()
const bodyParser = require('body-parser')
const path = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    let fileExt = ''
    if(file.mimetype == 'video/mp4'){
      fileExt = '.mp4'
    } else if(file.mimetype == 'audio/mp3'){
      fileExt = '.mp3'
    }  else if(file.mimetype == 'image/jpeg'){
      fileExt = '.jpg'
    }  else if(file.mimetype == 'image/png'){
      fileExt = '.png'
    }
    cb(null, file.fieldname + "-" + Date.now() + fileExt)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|mp3|mp4/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the "
      + "following filetypes - " + filetypes);
  }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function(req, res){
  res.send('aaaaaaaaaaaa')
})
app.post('/getnewuser', controllers.getnewuserController)
app.post('/otpverification', controllers.otpVerification)
app.post('/getItemList', controllers.getItemList)
//app.post("/uploadProfilePicture", upload.array('file', 9), controllers.uploadProfilePicture)
// app.post("/registration", controllers.registration)
// app.post("/logout", controllers.logout)
// app.post("/adminapproval", controllers.adminapproval)
// app.post("/setdata", controllers.setdata)
//app.post("/linkpostsave", controllers.linkpostsave)

app.listen(process.env.PORT || params.port, async () => {
  connection.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );
  console.log(`app listening at http://localhost:` + process.env.PORT || params.port)
})
