export default {
  name: 'current-user',

  initialize: (appInstance) => {
    appInstance.inject('model', 'currentUser', 'service:current-user');
    appInstance.inject('route', 'currentUser', 'service:current-user');
    appInstance.inject('controller', 'currentUser', 'service:current-user');
    appInstance.inject('component', 'currentUser', 'service:current-user');
    appInstance.inject('ability', 'currentUser', 'service:current-user');
  }
};
