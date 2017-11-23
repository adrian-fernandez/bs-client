import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
  validations: {
    email: {
      presence: true,
      format: {
        with: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        allowBlank: false
      }
    }
  },

  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  admin: DS.attr('boolean', { readOnly: true }),
  role: DS.hasMany('roles', { async: false }),
  rental: DS.hasMany('rentals', { async: true }),

  isAdmin: Ember.computed.oneWay('admin')
});
