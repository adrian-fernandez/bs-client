import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: (value) => {
    if (Ember.isArray(value)) {
      return Ember.A(value);
    } else {
      return Ember.A();
    }
  },

  serialize: (value) => {
    if (Ember.isArray(value)) {
      return Ember.A(value);
    } else {
      return Ember.A();
    }
  }
});
