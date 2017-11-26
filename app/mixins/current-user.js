import Ember from 'ember';
import $ from 'jquery';

export default Ember.Mixin.create({
  currentUser: Ember.inject.service(),
  session: Ember.inject.service(),
  permissions: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  accessiblePages: [
    'landing',
    'sign_up',
    'sign_in'
  ],

  _generateURL(transition) {
    const routing = this.get('routing');
    const params = Object.values(transition.params).filter(param => {
      return Object.values(param).length;
    });
    return routing.generateURL(transition.targetName, params, transition.queryParams);
  },

  requireNotAuthenticated(notAuthedFunction) {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo(this.get('permissions').accessibleLink());
    } else if (notAuthedFunction) {
      notAuthedFunction();
    }
  },

  isAccessible(transition) {
    if (!transition){
      return false;
    }
    const name = transition.targetName;
    return this.get('accessiblePages').includes(name);
  },

  signIn(identification, password, transition) {
    const redirect = transition || true;

    this.get('session').authenticate('authenticator:devise', identification, password).then(() => {
      const data = this.get('session.session.content');
      const token = data.authenticated.session.access_token;

      return this.get('currentUser').load(token).then(() => {
        let redirectUri = this.get('permissions').accessibleLink();
        if (transition) {
          redirectUri = transition;
        }
        this.transitionTo(redirectUri);
      }, () => {
        if (redirect) {
          this.transitionTo('landing');
        }
      });
    }, (response) => {
      if (response.responseJSON && response.responseJSON.errors && response.responseJSON.errors.session) {
        this.notifications.addNotification({
          message: response.responseJSON.errors.session,
          type: 'error',
          autoClear: true
        });
      }
    });
  },

  signOut() {
    const url = this.endpoints.urlFor('sign-out');
    const headers = this.get('session').authorize('authorizer:devise');

    return this.get('session').invalidate().then(() => {
      return $.ajax({
        url,
        type: 'DELETE',
        headers
      }).always(() => {
        window.location.href = '/';
      });
    });
  }
});
