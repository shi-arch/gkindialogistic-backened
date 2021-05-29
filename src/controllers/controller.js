
const status = require('../status/status')
const models = require('../models/model')
const constantParams = require('../constants/constant')
var base64 = require('base-64');
var jwt = require('jsonwebtoken');
const path = require("path")
var fs = require('fs');
var Async = require('async');

async function getnewuserController(req, res) {
  const body = req.body
  if (body.email || body.contact) {
    const response = await models.getnewuserModel(req.body)
    if (response && response.status) {
      result = await status.success(response)
    } else {
      result = await status.error(response)
    }
    res.send(result)
  } else {
    result = await status.error({ message: constantParams.emailMsg, data: {} })
    res.send(result)
  }

}


async function otpVerification(req, res) {
  const body = req.body
  if (body.otp) {
    const response = await models.otpVerification(body.otp)
    if (response.status) {
      result = await status.success(response)
    } else {
      result = await status.error(response)
    }
    res.send(result)
  } else {
    result = await status.error({ message: constantParams.otpMsg, data: {} })
    res.send(result)
  }
}

async function getItemList(req, res) {
  const response = await models.getItemList()
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}
// async function uploadProfilePicture(req, res, err) {
//   try {
//     if (err) {
//       console.log(err);
//     }
//     var file = req.files;
//     console.log(JSON.stringify(req.body));
//     if (file && (file.length == 2)) {
//       if (file[1].mimetype == 'image/jpeg' || file[1].mimetype == 'image/png') {        
//         const response = await models.uploadFileSetToDb({
//           fileDetails: file[0],
//           thumbnailDetails: file[1],
//           isApproved: false,
//           fileWithFullLength: true
//         })
//         if (response.status) {
//           result = await status.success({ message: constantParams.postMsg, data: { filename: file[0].filename } })
//         } else {
//           result = await status.error(response)
//         }
//         res.send(result)
//       } else {
//         Async.each(file, function (file, callback) {
//           let filePath = '/' + file.path
//           fs.unlinkSync(path.resolve(__dirname, '/node js') + filePath)
//           callback()
//         }, function (err) {
//           if (err) console.log('ERROR', err);
//           console.log("ALL FINISH");
//         });
//         result = await status.error({ message: constantParams.thumMsg, data: {} })
//       }
//     } else {
//       for (let i = 0; i < file.length; i++) {
//         let filePath = '/' + file[i].path
//         fs.unlinkSync(path.resolve(__dirname, '/node js') + filePath)
//       }
//       result = await status.error({ message: constantParams.fileMsg, data: {} })
//     }
//     res.send(result)
//   } catch (err) {
//     result = await status.error({ message: err, data: {} })
//     res.send(result)
//   }
// }
// async function adminapproval(req, res) {
//   let body = req.body
//   if (body && body.email) {
//     const response = await models.adminapproval(body)
//     if (response.status) {
//       result = await status.success(response)
//     } else {
//       result = await status.error(response)
//     }
//     res.send(result)
//   } else {
//     result = await status.error({ message: constantParams.missingMsg, data: {} })
//     res.send(result)
//   }
// }
// async function logout(req, res) {
//   let body = req.body
//   if (body && body.email) {
//     const response = await models.logout(body)
//     if (response.status) {
//       result = await status.success(response)
//     } else {
//       result = await status.error(response)
//     }
//     res.send(result)
//   } else {
//     result = await status.error({ message: constantParams.missingMsg, data: {} })
//     res.send(result)
//   }
// }
// async function registration(req, res) {
//   const body = req.body
//   if (body && body.email && body.dob && body.name && body.password) {
//     let encodedPassword = base64.encode(body.password);
//     body.password = encodedPassword
//     const response = await models.registration(body)
//     if (response.status) {
//       result = await status.success(response)
//     } else {
//       result = await status.error(response)
//     }
//     res.send(result)
//   } else {
//     result = await status.erro({ message: constantParams.missingMsg, data: {} })
//     res.send(result)
//   }
// }
// async function setdata(req, res) {
//   const body = req.body
//   if (body && body.filename && body.postTitle && body.postType && body.postCategory && body.email) {
//     const response = await models.setdata(body)
//     if (response.status) {
//       result = await status.success(response)
//     } else {
//       result = await status.error(response)
//     }
//     res.send(result)
//   } else {
//     result = await status.success({ message: constantParams.missingMsg, data: {} })
//     res.send(result)
//   }
// }

// async function linkpostsave(req, res) {
//   const body = req.body
//   if (body && body.link && body.postCategory && body.postTitle && body.email) {
//     let obj = {
//       link: body.link,
//       postCategory: body.postCategory,
//       postTitle: body.postTitle,
//     }
//     const response = await models.linkpostsave(obj, body.email)
//     if (response.status) {
//       result = await status.success(response)
//     } else {
//       result = await status.error(response)
//     }
//     res.send(result)
//   } else {
//     result = await status.error({ message: constantParams.otpMsg, data: {} })
//     res.send(result)
//   }
// }

module.exports = {
  getItemList: getItemList,
  getnewuserController: getnewuserController,
  otpVerification: otpVerification,
  // registration: registration,
  // logout: logout,
  // adminapproval: adminapproval,
  // uploadProfilePicture: uploadProfilePicture,
  // setdata: setdata,
  // linkpostsave: linkpostsave
}