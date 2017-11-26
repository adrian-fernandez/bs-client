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
    if (this.get('rental.busyDays')) {
      return this.get('rental.busyDays').toArray().map((x) => moment(x).format('D MMM. YYYY'));
    } else {
      return [];
    }
  }),

  canShowTo: Ember.computed.oneWay('booking.startAt'),

  canShowPrice: Ember.computed.and('booking.startAt', 'booking.endAt'),

  canConfirmBooking: Ember.computed.oneWay('canShowPrice'),

  calculatedBookingDays: Ember.computed('booking.startAt', 'booking.endAt', function() {
    const startDate = moment(this.get('booking.startAt')).startOf('day');
    const endDate = moment(this.get('booking.endAt')).startOf('day');

    return endDate.diff(startDate, 'days');
  }),

  calculatedBookingPrice: Ember.computed('booking.startAt', 'booking.endAt', 'rental.dailyRate', function() {
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
      this.send('closeModal', this.get('from'));
    }
  }
});
