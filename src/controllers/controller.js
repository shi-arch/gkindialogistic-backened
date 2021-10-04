
const status = require('../status/status')
const models = require('../models/model')
const constantParams = require('../constants/constant')


async function getUserlist(req, res) {
  const response = await models.getUserlist()
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}

async function generateparcel(req, res){
  const response = await models.generateparcel(req.body)
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}

async function getallparcel(req, res){
  const response = await models.getallparcel(req.body)
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}


async function searchparcel(req, res){
  const response = await models.searchparcel(req.body)
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}

async function updateparcel(req, res){
  const response = await models.updateparcel(req.body)
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}

async function deleteparcel(req, res){
  const response = await models.deleteparcel(req.body)
  if (response.status) {
    result = await status.success(response)
  } else {
    result = await status.error(response)    
  }
  res.send(result)
}


async function adminLogin(req, res) {
  if(req && req.body){
    const response = await models.adminLogin(req.body)
    if (response.status) {
      result = await status.success(response)
    } else {
      result = await status.error(response)    
    }
  } else {
    result = await status.error(response)    
  }
  
  res.send(result)
}

module.exports = {
  getUserlist: getUserlist,
  adminLogin: adminLogin,
  searchparcel: searchparcel,
  generateparcel: generateparcel,
  updateparcel: updateparcel,
  deleteparcel: deleteparcel,
  getallparcel: getallparcel
}