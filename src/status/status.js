
let message = ''
let data = {}

async function success(obj){    
    if(obj && obj.message){
        message = obj.message
    }
    if(obj && obj.data){
        data = obj.data
    }
    return {
        status: true,
        message: message,
        data: data
    }
}

async function error(obj){
    if(obj && obj.message){
        message = obj.message
    }
    if(obj && obj.data){
        data = obj.data
    }
    return {
        status: false,
        message: message,
        data: data
    }
}


module.exports = {
    success: success,
    error: error
}
