export default {
  name: 'injectRouteIntoComponent',
  after: 'injectStoreIntoComponent',

  initialize: (application) => {
    application.inject('component', 'router', 'router:main');
    application.inject('controller', 'router', 'router:main');
  }
};
