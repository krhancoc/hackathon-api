const MongoClient = require('mongodb').MongoClient;

const url = process.env.NODE_ENV? 'mongodb://52.53.149.194:27017' : 'mongodb://localhost:27017'
const dbName = 'aggregate';

module.exports.variable = {
  handler: function(request, reply) {
      
    MongoClient.connect(url, function(err, client) {
      // Create a collection we want to drop later
      const col = client.db(dbName).collection(process.env.DEVICE_ID);
      col.find({}).sort({'time': -1}).limit(50).toArray(function (err, result) {

        let values = result.filter(function(val) {
          let check = false;
          for(let i in val.variables) {
            const x = val.variables[i];
            if(x.name == request.params.variable) {
              check = true;
            }
          }
          return check;
        }).map(function(val) {

          const v = val.variables.filter(function(r) {

            return r.name == request.params.variable
          })[0];
          return {
            time: val.time,
            value: v.result
          }
        });
        return reply({values}).code(200);
      });

    });
  }
}