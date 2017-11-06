import Ember from 'ember';

export default Ember.Service.extend(Ember._ProxyMixin, {
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  user: Ember.computed.oneWay('content'),
  isAdmin: Ember.computed.oneWay('user.admin'),

  load() {
    return this.get('store').queryRecord('user', { me: true }).then((user) => {
      this.set('content', user);
      return user;
    }, () => {
      return null;
    }).catch(() => {
      if (this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
      }

      return Ember.RSVP.reject();
    });
  }
});
