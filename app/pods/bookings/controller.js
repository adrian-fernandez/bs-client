import Ember from 'ember';
import FiltersMixin from 'bs-client/mixins/filters-mixin';
import UsersMixin from 'bs-client/mixins/users-mixin';
import CommonActions from 'bs-client/mixins/common-actions';

export default Ember.Controller.extend(FiltersMixin, UsersMixin, CommonActions, {
  availableAdminColumns: ['rental', 'user', 'start_at', 'end_at', 'days', 'price'],
  availableUserColumns: ['rental', 'start_at', 'end_at', 'days', 'price'],
  availableDateFilters: ['all', 'upcoming', 'expired'],
  dateFilter: 'upcoming',

  sortField: 'start_at',
  sortDirection: 'desc',

  queryParams: [
    'q',
    'page',
    { sortField: 'sort_field' },
    { sortDirection: 'sort_direction' },
    { dateFilter: 'date_filter' },
    { fromFilter: 'from_filter' },
    { toFilter: 'to_filter' }
  ],

  totalPages: Ember.computed.readOnly('bookings.meta.total_pages'),

  actions: {
    delete(booking) {
      this.doDelete(booking, 'booking');
    }
  }
});
