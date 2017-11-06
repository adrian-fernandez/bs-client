export default {
  name: 'permissions',
  after: 'current-user',

  initialize: function(appInstance) {
    appInstance.inject('model', 'permissions', 'service:permissions');
    appInstance.inject('route', 'permissions', 'service:permissions');
    appInstance.inject('controller', 'permissions', 'service:permissions');
    appInstance.inject('component', 'permissions', 'service:permissions');
    appInstance.inject('ability', 'permissions', 'service:permissions');
  }
};
