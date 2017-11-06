import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
  validations: {
    name: {
      presence: true
    }
  },

  name: DS.attr('string'),
  dailyRate: DS.attr('number'),
  busyDays: DS.attr('array'),

  user: DS.belongsTo('user', { async: false }),
  bookings: DS.hasMany('bookings', { async: true }),

  canBeDeleted: Ember.computed('user', 'currentUser', function() {
    return this.get('currentUser.admin') ||
      this.get('currentUser.id') === this.get('user.id');
  })
});
