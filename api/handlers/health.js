`use strict`;
const env = process.env.NODE_ENV || 'mock';

const EConfig = require('../../config/electron')[env];
const ElectronDriver = require('../../electron/driver')(EConfig);
const Util = require('../util');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.NODE_ENV? 'mongodb://52.53.149.194:27017' : 'mongodb://localhost:27017'
const dbName = 'aggregate';

module.exports.full = {
  handler: function (request, reply) {

    if(typeof(request.query.new) === 'undefined') {

      MongoClient.connect(url, function(err, client) {
        // Create a collection we want to drop later
        const col = client.db(dbName).collection(process.env.DEVICE_ID);
        col.find({}).sort({'time': -1}).limit(1).toArray(function (err, result) {

          return reply(result).code(200);
        });
      });
    } else {
      let reach = Promise.all(EConfig.registered.variables.map( v => ElectronDriver.getVariable(v)));

      Util.promiseTimeout(10000, reach).then(vars => {

        if(typeof(request.query.react) !== 'undefined') {
          const response = {}
          response.time = Date.now();
          for(let i in vars) {
            let v = vars[i]
            response[v.name] = {
              alerts: v.alerts,
              result: v.result
            }
          }
          return reply(response).code(200);
        } else {
          return reply({
            time: Date.now(),
            variables: vars
          }).code(200);
        }
      }).catch(err => {
        return reply({
          err: "Could not retrieve data",
          error: err,
          code: "504"
        }).code(504)
      })
    }
  }
};