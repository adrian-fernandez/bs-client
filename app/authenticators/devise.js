import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'bs-client/config/environment';
const { RSVP, isEmpty } = Ember;

export default Base.extend({
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data) && !isEmpty(data.user)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(email, password) {
    return Ember.$.ajax({
      url: `${ENV.BACKEND_URL}/api/v1/user_sessions.json`,
      type: 'POST',
      data: {
        'session': {
          email,
          password
        }
      }
    });
  }
});
