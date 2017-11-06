import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
  validations: {
    start_at: {
      presence: true
    },
    end_at: {
      presence: true
    },
    user: {
      presence: true
    },
    rental: {
      presence: true
    }
  },

  start_at: DS.attr('date'),
  end_at: DS.attr('date'),
  days: DS.attr('number', { readOnly: true }),
  price: DS.attr('number', { readOnly: true }),

  user: DS.belongsTo('user', { async: true }),
  rental: DS.belongsTo('rental', { async: false }),

  hasStarted: Ember.computed('start_at', function() {
    return moment(this.get('start_at')) <= moment(new Date());
  }),

  hasEnded: Ember.computed('end_at', function() {
    return moment(this.get('end_at')) <= moment(new Date());
  }),

  isNow: Ember.computed('start_at', 'end_at', function() {
    const today = new Date();

    return moment(this.get('end_at')) > moment(today) &&
      moment(this.get('start_at')) <= moment(today);
  })
});
