const Home = require('./handlers/home');
const Health = require('./handlers/health');
const Poller = require('./handlers/poller');
const Get = require('./handlers/get');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/health', config: Health.full },
    { method: 'GET', path: '/spawnPoller', config: Poller},
    { method: 'GET', path: '/get/{variable}', config: Get.variable }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};