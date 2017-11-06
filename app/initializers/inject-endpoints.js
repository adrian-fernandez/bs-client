import Endpoints from 'bs-client/services/endpoints';

export default {
  name: 'injectEndpoints',
  after: ['cookie'],

  initialize: (application) => {
    application.register('service:endpoints', Endpoints);
    application.inject('controller', 'endpoints', 'service:endpoints');
    application.inject('route',      'endpoints', 'service:endpoints');
    application.inject('model',      'endpoints', 'service:endpoints');
    application.inject('component',  'endpoints', 'service:endpoints');

    application.inject('adapter',    'cookie',    'cookie:main');
    application.inject('controller', 'cookie',    'cookie:main');
    application.inject('route',      'cookie',    'cookie:main');
    application.inject('service',    'cookie',    'cookie:main');

    application.inject('controller', 'permissions', 'service:permissions');
    application.inject('route',      'permissions', 'service:permissions');
    application.inject('model',      'permissions', 'service:permissions');
    application.inject('component',  'permissions', 'service:permissions');
  }
};
