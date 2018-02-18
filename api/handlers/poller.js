const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  handler: function(request, reply) {
      
      let proc = exec(`./script.sh ${process.env.DEVICE_ID} ${process.env.ELECTRON_ACCESS_TOKEN}`)
        .then(out => {
          console.log('done');
        })
        .catch(err => {

          console.log(err);
        });
      proc.stdout.on('data', (data) => {
        console.log(data);
      });
      reply("Device created started -- this may still error <(^ . ^ <) check dem logs peasant").code(200);

  }
}