const timeout = {
  value: Date.now()
}

module.exports.variable = {

  handler: function(request,reply) {

    const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_AUTH);
    const current = Date.now()
    const delta = (current - timeout.value)/1000
    if(delta > 60)  {
      client.messages
      .create({
        to: '+14038136314',
        from: '+15873333221',
        body: `Warning from your particle -- ${request.params.variable} detected`,
      })
      .then(message => console.log(message.sid))
      .catch(err => {
        console.log(err);
      })
      timeout.value = current;

      return reply({res: 'Success'}).code(200);
    } else {
      return reply({res: 'Message has already been sent in the last 60 seconds', val: delta})
        .code(200);
    }
  }
}