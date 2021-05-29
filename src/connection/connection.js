const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const params = require('../constants/constant')
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(params.mongoDbConnectionUri, connectionParams);
let dbConn;
module.exports = {
    connectToServer: function( callback ) {
        try{
            client.connect(async err => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Connection successfull...!');
                }
                dbConn = client.db("Fairdeelz")
                return callback( err );
            });
        } catch (err){
            console.log(err);
        }
    },
  
    getDb: function() {
      return dbConn;
    }
  };

  