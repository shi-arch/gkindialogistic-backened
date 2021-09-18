
const connection = require('../connection/connection')
const constantParams = require('../constants/constant');

async function getallparcel(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("parcelData");
    const totalCount = await collection.aggregate([
        {
            $group: {
                _id: null,
                count: {$sum: 1}
            }
        }
    ]).toArray() 
    let response = await collection.aggregate([
        { $skip : body.skip }, {$limit: body.limit }
    ]).toArray() 
    console.log(response,'sssssssssssssssssssss')  
    if (response && response.length) {
        return { data: {count : totalCount[0].count, data: response}, message: "Here is your all parcels", status: true }
    } else {
        return { data: {}, message: "No parcel found", status: false }
    }
}

async function generateparcel(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("parcelData");
    const response = await collection.aggregate([
        {
            $group: {
                _id: null,
                maxQuantity: {$max: "$parcelNumber"}
            }
        }
    ]).toArray()   
    if (response && response.length) {
        body.parcelNumber = response[0].maxQuantity + 1
    } else {
        body.parcelNumber = 1     
    }
    let result = await collection.insertOne(body)
    if (result !== null) {
        return { message: "Parcel number generated successfully", status: true }
    } else {
        return { message: "something went wrong", status: false }
    }

}


async function searchparcel(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("parcelData"); 
    let obj = {} 
    if(body.type == "Enter Mobile Number"){
        obj.contact = body.contact
    }
    
    if(body.type == "Enter Parcel Id"){
        obj.parcelNumber = JSON.parse(body.parcelNumber.charAt(4))
    }  
    const response = await collection.find(obj).toArray()
    if (response && response.length) {
        return { data: response, message: "Parcel details found successfully", status: true }
    } else {
        return { data: {}, message: "Parcel not found", status: false }
    }
}

async function updateparcel(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("parcelData");
    let response = await collection.findOneAndUpdate(
        { parcelNumber: body.parcelNumber },
        { $set: { status: body.status } }
    )
    if (response && response.value !== null) {
        return { data: response.value, message: "Parcel Status is updated successfully", status: true }
    } else {
        return { data: {}, message: "Something went wrong", status: false }
    }
}




async function getUserlist() {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("userlist");
    let response = await collection.find({}).toArray()
    if (response && response.length) {
        return { data: response, message: constantParams.requestMsg, status: true }
    } else {
        return { data: {}, message: constantParams.otpCheck, status: false }
    }
}

async function adminLogin(body) {
    let dbConn = connection.getDb()
    const collection = await dbConn.collection("userlist");
    const response = await collection.findOne({ email: body.email, admin: true, password: body.password })
    if (response && response.email) {
        return { data: response, message: "Admin login successfull", status: true }
    } else {
        return { data: {}, message: "Please enter the correct credentials", status: false }
    }
}

module.exports = {
    getUserlist: getUserlist,
    adminLogin: adminLogin,
    generateparcel: generateparcel,
    searchparcel: searchparcel,
    getallparcel: getallparcel,
    updateparcel: updateparcel
}