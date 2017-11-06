import Ember from 'ember';
import FiltersMixin from 'bs-client/mixins/filters-mixin';
import UsersMixin from 'bs-client/mixins/users-mixin';
import CommonActions from 'bs-client/mixins/common-actions';

export default Ember.Controller.extend(FiltersMixin, UsersMixin, CommonActions, {
  availableUserColumns: ['name', 'daily_rate'],
  availableAdminColumns: ['name', 'user', 'daily_rate'],
  canShowToAdmin: Ember.computed.oneWay('currentUser.isAdmin'),
  isShowingBookingModal: false,

  sortField: 'name',
  sortDirection: 'asc',

  queryParams: [
    'page',
    'q',
    { sortField: 'sort_field' },
    { sortDirection: 'sort_direction' },
    { userFilter: 'user_filter' },
    { priceFromFilter: 'price_from_filter' },
    { priceToFilter: 'price_to_filter' }
  ],

  totalPages: Ember.computed.readOnly('rentals.meta.total_pages'),

  actions: {
    book(rental) {
      this.set('selectedRental', rental);
      this.toggleProperty('isShowingBookingModal');
    },

    delete(rental) {
      this.doDelete(rental, 'rental');
    },

    priceFilterChange(value) {
      Ember.run.debounce(this, () => {
        this.set('priceFromFilter', value[0]);
        this.set('priceToFilter', value[1]);
      }, 400);
    }
  }
});
