import Ember from 'ember';

// TODO: Rename UrlHelper
export default Ember.Service.extend({
  urls: {
    'sign-out': () => { return '/user_sessions/'; }
  },

  urlFor(name, args) {
    const func = this.urls[name];
    const urlTemplate = '/api/v1' + func(args);
    return urlTemplate;
  }
});
