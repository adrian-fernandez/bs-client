import Ember from 'ember';

export default Ember.Mixin.create({
  intl: Ember.inject.service(),

  page: 0,

  availableColumns: Ember.computed('currentUser.isAdmin', function() {
    if (this.get('currentUser.isAdmin')) {
      return this.get('availableAdminColumns');
    } else {
      return this.get('availableUserColumns');
    }
  }),

  deferRentalSearch: Ember.observer('rentalFilter', function() {
    Ember.run.debounce(this, this.setRentalFilter, 400);
  }),

  setDefaultRentalFilter: function() {
    this.set('rentalFilter', this.get('q'));
    this.set('from', this.get('fromFilter'));
    this.set('to', this.get('toFilter'));
  }.on('init'),

  setRentalFilter() {
    if (this.get('rentalFilter')) {
      this.set('q', this.get('rentalFilter'));
    } else {
      this.set('q', undefined);
    }
  },

  actions: {
    setFromDate(value) {
      if (value.isValid()) {
        this.set('fromFilter', moment(value).format('YYYY-MM-DD'));
      } else {
        this.set('fromFilter', undefined);
      }
    },

    setToDate(value) {
      if (value.isValid()) {
        this.set('toFilter', moment(value).format('YYYY-MM-DD'));
      } else {
        this.set('toFilter', undefined);
      }
    },

    selectUserFilter(user) {
      if (user) {
        this.set('userFilterObj', user);
        this.set('userFilter', user.get('id'));
      } else {
        this.set('userFilterObj', undefined);
        this.set('userFilter', undefined);
      }
    }
  }
});
