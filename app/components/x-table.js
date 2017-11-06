import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  tagName: 'table',
  classNames: ['table', 'table-over'],

  thClass: 'col',
  noSortedClass: 'no-sorted',
  sortedClass: '',
  showActionsColumn: true,
  sortableFields: [],

  isLoggedIn: Ember.computed.oneWay('session.isAuthenticated'),

  translationsRoot: Ember.computed('modelName', function() {
    return this.get('modelName') + '.columns.';
  }),

  userEmail: Ember.computed('currentUser.email', function() {
    return this.get('currentUser.email');
  }),

  toggleSortDirection() {
    const newDirection = (this.get('sortDirection') === 'asc') ? 'desc' : 'asc';

    this.set('sortDirection', newDirection);
  },

  actions: {
    setSort(column) {
      if (this.get('sortField') === column) {
        this.toggleSortDirection();
      } else {
        this.set('sortField', column);
        this.set('sortDirection', 'asc');
      }
    }
  }
});
