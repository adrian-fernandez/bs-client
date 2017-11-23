import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
  validations: {
    startAt: {
      presence: true
    },
    endAt: {
      presence: true
    },
    user: {
      presence: true
    },
    rental: {
      presence: true
    }
  },

  startAt: DS.attr('date'),
  endAt: DS.attr('date'),
  days: DS.attr('number', { readOnly: true }),
  price: DS.attr('number', { readOnly: true }),

  user: DS.belongsTo('user', { async: true }),
  rental: DS.belongsTo('rental', { async: false }),

  hasStarted: Ember.computed('startAt', function() {
    return moment(this.get('startAt')) <= moment(new Date());
  }),

  hasEnded: Ember.computed('endAt', function() {
    return moment(this.get('endAt')) <= moment(new Date());
  }),

  isNow: Ember.computed('startAt', 'endAt', function() {
    const today = new Date();

    return moment(this.get('endAt')) > moment(today) &&
      moment(this.get('startAt')) <= moment(today);
  })
});
