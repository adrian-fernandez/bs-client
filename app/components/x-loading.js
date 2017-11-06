import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  show: false,
  height: '32px',
  width: '32px',

  deferComponentContentRendering: Ember.on('didInsertElement', function() {
    const timeout = this.get('timeout') || 300;

    Ember.run.later(() => {
      if (!this.get('isDestroyed')) {
        this.set('show', true);
      }
    }, timeout);
  })
});
