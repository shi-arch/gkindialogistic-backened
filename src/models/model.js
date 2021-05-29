
const connection = require('../connection/connection')
const nodemailer = require("nodemailer");
const constantParams = require('../constants/constant');

async function generate(n) {
    var add = 1, max = 12 - add;
    if (n > max) {
        return generate(max) + generate(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
}

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: constantParams.authEmail,
        pass: constantParams.password //replace your email and password here
    }
});

async function getnewuserModel(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("users");
    
    let otp = await generate(6)
    if (body.email) {
        const isEmailExists = await collection.findOne({ email: body.email })
        if (isEmailExists == null) {
            let response = await collection.insertOne({ email: body.email, isEmailVerified: false, otp: otp })
            if (response !== null) {
                var mailOptions = {
                    from: 'testshivramkashyap512@gmail.com',
                    to: body.email,
                    subject: constantParams.subject,
                    html: "<h3>Please use this otp to verify its you</h3> : " + "<span>" + otp + "</span>"
                };
                let result = await transporter.sendMail(mailOptions);
                if (result && result.response) {
                    return { data: {}, message: constantParams.otpSent, status: true }
                }
            } else {
                return { data: {}, message: constantParams.authFail, status: false }
            }
        } else {
            return { data: {}, message: 'email already exists', status: false }
        }
    } else {
        return { data: {}, message: constantParams.authFail, status: false }
    }
}

async function otpVerification(otp) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("users");
    let response = await collection.findOneAndUpdate(
        { otp: otp },
        { $set: { isEmailVerified: true } }
    )
    if (response && response.value !== null) {
        return { data: response.value, message: constantParams.succesMsg, status: true }
    } else {
        return { data: {}, message: constantParams.otpCheck, status: false }
    }
}

async function getItemList() {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("product_list");
    let response = await collection.find({}).toArray()
    if (response && response.length) {
        return { data: response, message: constantParams.succesMsg, status: true }
    } else {
        return { data: {}, message: constantParams.otpCheck, status: false }
    }
}

// async function registration(body) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("userData");
//     let obj = {
//         email: body.email
//     }
//     if (body && body.admin) {
//         obj.admin = true
//     }
//     let response = await collection.findOne(obj)
//     if (response == null) {
//         let otp = await generate(6)
//         obj = {
//             token: '',
//             otp: otp,
//             name: body.name,
//             dob: body.dob,
//             password: body.password,
//             isEmailVerified: false,
//             email: body.email
//         }
//         if (body && body.admin) {
//             obj.admin = true
//             obj.isApproved = false
//         }
//         let response = await collection.insertOne(obj)
//         if (response !== null) {
//             var mailOptions = {
//                 from: 'kashyapshivram512@gmail.com',
//                 to: body.email,
//                 subject: constantParams.subject,
//                 html: "<h3>Please use this otp to login</h3> : " + "<span>" + otp + "</span>"
//             };
//             let result = await transporter.sendMail(mailOptions);
//             if (result && result.response) {
//                 return { data: {}, message: constantParams.checkOtp, status: true }
//             } else {
//                 return { data: response.value, message: constantParams.otpNotSent, status: false }
//             }
//         } else {
//             return { data: response, message: constantParams.dataNotSave, status: false }
//         }
//     } else {
//         return { data: {}, message: constantParams.existMsg, status: false }
//     }


// }
// async function logout(body) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("userData");
//     let updateResponse = await collection.findOneAndUpdate(
//         { email: body.email },
//         { $set: { token: '', otp: '' } }
//     )
//     if (updateResponse !== null) {
//         return { data: {}, message: constantParams.logOut, status: true }
//     } else {
//         return { data: response, message: constantParams.wrongEmail, status: false }
//     }
// }

// async function adminapproval(body) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("userData");
//     let updateResponse = await collection.findOneAndUpdate(
//         { email: body.email, isAdmin: true },
//         { $set: { isApproved: true } }
//     )
//     if (updateResponse.value !== null) {
//         var mailOptions = {
//             from: 'kashyapshivram512@gmail.com',
//             to: body.email,
//             subject: 'Admin approval from super admin',
//             html: "<h3>Congratulations...! You are approved as admin</h3>"
//         };
//         let result = await transporter.sendMail(mailOptions);
//         if (result && result.response) {
//             return { data: {}, message: 'Admin approved', status: true }
//         } else {
//             return { data: {}, message: constantParams.mailNotSent, status: false }
//         }
//     } else {
//         return { data: response, message: constantParams.wrongEmail, status: false }
//     }
// }
// async function uploadFileSetToDb(body) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("PostContentData");
//     let result = await collection.insertOne(body)
//     if (result !== null) {
//         return { data: {}, message: constantParams.postMsg, status: true }
//     } else {
//         return { data: {}, message: constantParams.notSave, status: false }
//     }
// }
// async function linkpostsave(body, email) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("PostContentData");
//     const userCollection = await dbConn.collection("userData");
//     let response = await userCollection.findOne({ email: email, isEmailVerified: true })
//     if (response !== null) {
//         if (response.superAdmin) {
//             body.isApproved = true
//         } else if (response.admin) {
//             body.isApproved = false
//         }
//         let result = await collection.insertOne(body)
//         if (result !== null) {
//             return { data: {}, message: constantParams.postMsg, status: true }
//         } else {
//             return { data: {}, message: constantParams.notSave, status: false }
//         }
//     } else {
//         return { data: {}, message: constantParams.mailNotExist, status: false }
//     }
// }
// async function setdata(body) {
//     let dbConn = connection.getDb()
//     const collection = await dbConn.collection("PostContentData");
//     const userCollection = await dbConn.collection("userData");
//     let response = await userCollection.findOne({ email: body.email, isEmailVerified: true })
//     if (response !== null) {
//         let obj = {
//             postTitle: body.postTitle,
//             postCategory: body.postCategory
//         }
//         if (response.superAdmin) {
//             obj.isApproved = true
//         } else if (response.admin) {
//             obj.isApproved = false
//         }
//         let result = await collection.findOneAndUpdate(
//             { "fileDetails.filename": body.filename },
//             { $set: obj }
//         )
//         if (result && result.value !== null) {
//             return { data: {}, message: constantParams.postMsg, status: true }
//         } else {
//             return { data: {}, message: constantParams.notSave, status: false }
//         }
//     } else {
//         return { data: {}, message: constantParams.mailNotExist, status: false }
//     }
// }

module.exports = {
    getnewuserModel: getnewuserModel,
    otpVerification: otpVerification,
    getItemList: getItemList
    // registration: registration,
    // logout: logout,
    // adminapproval: adminapproval,
    // setdata: setdata,
    // uploadFileSetToDb: uploadFileSetToDb,
    // linkpostsave: linkpostsave
}