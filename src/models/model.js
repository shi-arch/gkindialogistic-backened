
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
    service: 'gmail',
    port: 587,
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


module.exports = {
    getnewuserModel: getnewuserModel
}