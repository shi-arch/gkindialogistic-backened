const constantParams = {
    port: 5000,
    mongoDbConnectionUri : "mongodb+srv://shivram:Sonalidubey@512@cluster0.vctwu.mongodb.net/test?retryWrites=true&w=majority",
    emailMsg: 'Email or password is missing',
    missingMsg: 'some data is missing',
    otpMsg: 'otp is missing',
    postMsg: 'post uploaded successfully',
    thumMsg: 'thumnail image should be on the second number',
    fileMsg: 'File should be two in numbers',
    authEmail: 'testshivramkashyap512@gmail.com',
    password: 'Sonalidubey@512',
    subject: 'otp verification code',
    otpSent: 'otp sent to your registered email address...',
    errMsg: 'something went wrong',
    authFail: 'authentication failed ... !',
    checkOtp: 'Please check your email for otp verification',
    otpNotSent: 'otp not sent, something went wrong in email',
    dataNotSave: 'data not saved to db',
    existMsg: 'email already exists',
    mailNotSent: 'email not sent',
    notSave: 'details are not saved to db',
    succesMsg: 'verification successfull ... !',
    mailNotExist: 'email does not exists',
    otpCheck: 'please check the otp',
    logOut: 'User logged out successfully',
    wrongEmail: 'Email is incorrect'
}

module.exports = constantParams