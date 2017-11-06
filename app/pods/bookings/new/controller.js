import Ember from 'ember';
import DS from 'ember-data';
import ErrorGenerator from 'bs-client/mixins/error-generator';

export default Ember.Controller.extend(ErrorGenerator, {
  allUsersExceptMe: Ember.computed(function() {
    return this.get('store').query('user',
      {
        exclude_ids: this.get('currentUser.user.id')
      }
    );
  }),

  busyDays: Ember.computed('rental.busyDays.@each', function() {
    return this.get('rental.busyDays').toArray().map((x) => moment(x).format('D MMM. YYYY'));
  }),

  canShowTo: Ember.computed.oneWay('booking.start_at'),

  canShowPrice: Ember.computed.and('booking.start_at', 'booking.end_at'),

  canConfirmBooking: Ember.computed.oneWay('canShowPrice'),

  calculatedBookingDays: Ember.computed('booking.start_at', 'booking.end_at', function() {
    const startDate = moment(this.get('booking.start_at')).startOf('day');
    const endDate = moment(this.get('booking.end_at')).startOf('day');

    return endDate.diff(startDate, 'days');
  }),

  calculatedBookingPrice: Ember.computed('booking.start_at', 'booking.end_at', 'rental.dailyRate', function() {
    return this.get('rental.dailyRate') * this.get('calculatedBookingDays');
  }),

  actions: {
    save() {
      const booking = this.get('booking');

      var valid = () => {
        this.notifications.addNotification({
          message: this.get('intl').t('booking.messages.created'),
          type: 'success',
          autoClear: true
        });

        this.get('modal').reload();
        this.send('closeModal');
      };

      var invalid = (response) => {
        this.notifications.addNotification({
          message: this.generateErrors(response.errors),
          type: 'error',
          autoClear: true
        });
      };

      booking.validate().then(() => {
        booking.set('errors', new DS.Errors());
        booking.save().then(valid, invalid);
      }).catch(() => {
        this.notifications.addNotification({
          message: this.generateErrors(booking.get('errors')),
          type: 'error',
          autoClear: true
        });
      });
    },

    close() {
      this.send('closeModal');
    }
  }
});
