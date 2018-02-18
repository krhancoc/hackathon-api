'use strict';

const fetch = require('node-fetch');

module.exports = (config) => {
    return {
        getVariable: function(var_settings) {

            const request = {
              method: 'GET'
            };
          
            let url = `${config.protocol}://${config.host}/${config.apiVersion}/`;
            url += `devices/${process.env.DEVICE_ID}/${var_settings.name}?`;
            url += `access_token=${process.env.ELECTRON_ACCESS_TOKEN}`;
            
            //console.log('FETCHING - ', url);
            return fetch(url, request).then(res => res.json()).then(json => {
         
                return new Promise((resolve, reject) => {
          
                  var_settings.result = json.result;
                  resolve(var_settings);
                });
            });

        }
    }
}


