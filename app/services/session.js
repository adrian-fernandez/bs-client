import Ember from 'ember';
import Session from 'ember-simple-auth/services/session';
const { getOwner } = Ember;

export default Session.extend({
  authorize(authorizerFactory, block) {
    const authorizer = getOwner(this).lookup(authorizerFactory),
      sessionData = { token: this.get('data.authenticated.session.access_token') };

    return authorizer.authorize(sessionData, block);
  }
});
