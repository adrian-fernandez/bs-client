import Ember from 'ember';
import DatePickerSupport from 'ember-cli-bootstrap-datepicker/components/datepicker-support';
import moment from 'moment';

export default Ember.Mixin.create(DatePickerSupport, {
  inPast: false,
  inFuture: true,
  format: 'd M. yyyy',
  todayHighlight: true,
  weekStart: 1,
  language: 'en',
  clearBtn: true,
  autoclose: true,
  classNames: ['datepicker'],

  startDate: Ember.computed('inPast', 'afterDate', function() {
    if (this.get('afterDate')) {
      return this.get('afterDate');
    } else if (this.get('inPast')) {
      return -Infinity;
    } else {
      return new Date();
    }
  }),

  endDate: Ember.computed('inFuture', function() {
    if (this.get('inFuture')) {
      return Infinity;
    } else {
      return new Date();
    }
  }),

  setValueWhenDateChanges: Ember.on('didReceiveAttrs', function() {
    const date = this.get('date');

    if (date) {
      this.set('value', moment(date).toDate());
    }
  }),

  setChangeDateAction: Ember.on('init', function() {
    this.set('changeDate', (date) => {
      if (this.get('action')) {
        this.sendAction('action', moment(date));
      }
    });
  })
});
