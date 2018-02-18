const Home = require('./handlers/home');
const Health = require('./handlers/health');
const Poller = require('./handlers/poller');
const Get = require('./handlers/get');
const Post = require('./handlers/post');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/health', config: Health.full },
    { method: 'GET', path: '/spawnPoller', config: Poller },
    { method: 'GET', path: '/get/{variable}', config: Get.variable },
    { method: 'GET', path: '/post/{variable}', config: Post.variable }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};