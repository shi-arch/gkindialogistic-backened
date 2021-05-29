
const status = require('../status/status')
const models = require('../models/model')
const constantParams = require('../constants/constant')

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

module.exports = {getnewuserController: getnewuserController,}