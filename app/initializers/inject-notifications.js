export default {
  name: 'inject-notifications',
  initialize: (application) => {
    application.inject('controller', 'notifications', 'service:notification-messages');
    application.inject('route',      'notifications', 'service:notification-messages');
    application.inject('component',  'notifications', 'service:notification-messages');
  }
};
