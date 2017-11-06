import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({
  authorize(data, block) {
    const token = data.token;
    const csrf = Ember.$.cookie('XSRF-TOKEN');
    const headers = {'X-API-TOKEN': token, 'X-CSRF-Token': csrf, 'charset': 'utf-8'};
    if (block){
      block('X-API-TOKEN', token);
    } else {
      return headers;
    }
  }
});
