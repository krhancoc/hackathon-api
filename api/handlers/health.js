`use strict`;
const env = process.env.NODE_ENV || 'mock';

const EConfig = require('../../config/electron')[env];
const ElectronDriver = require('../../electron/driver')(EConfig);
const Util = require('../util');

module.exports.full = {
  handler: function (request, reply) {

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
};