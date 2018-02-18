module.exports.restricted = {
  auth: 'jwt',
  handler: function (request, reply) {

    return reply({ result: 'Restricted!' });
  }
};

module.exports.notFound = {
  handler: function (request, reply) {

    return reply({ result: 'Oops, 404 Page!' }).code(404);
  }
};

