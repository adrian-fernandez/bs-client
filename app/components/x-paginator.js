import Ember from 'ember';

export default Ember.Component.extend({
  currentPage: Ember.computed.oneWay('page'),
  hasPages: Ember.computed.gt('content.meta.total_pages', 1),

  isCurrentPage: (page) => {
    return this.get('page') === page;
  },

  iterator: Ember.computed('totalPages', 'tooManyPages', function() {
    const times = this.get('totalPages'),
      array = [];

    if (this.get('tooManyPages')) {
      return array;
    }

    for (var i = 1; i <= times; i++) {
      array[i] = i;
    }
    return array;
  }),

  tooManyPages: Ember.computed.gt('totalPages', 20),

  totalPages: Ember.computed.readOnly('content.meta.total_pages'),

  canStepForward: function() {
    const page = Number(this.get('currentPage')),
      totalPages = Number(this.get('totalPages'));

    return page < totalPages;
  }.property('currentPage', 'totalPages'),

  canStepBackward: function() {
    const page = Number(this.get('currentPage'));

    return page > 1;
  }.property('currentPage'),

  actions: {
    pageClicked(number) {
      this.set('currentPage', number);
      this.sendAction('changePage', number);
    },

    incrementPage(num) {
      var currentPage = Number(this.get('currentPage')),
        totalPages = Number(this.get('totalPages'));

      if (currentPage === totalPages && num === 1) { return false; }
      if (currentPage <= 1 && num === -1) { return false; }

      this.incrementProperty('currentPage', num);

      var newPage = this.get('currentPage');
      this.sendAction('changePage', newPage);
    }
  }
});
