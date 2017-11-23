import Ember from 'ember';

export default Ember.Helper.helper(function ([column, sortField, sortDirection]) {
  if (sortField !== column) {
    return 'fa-sort';
  } else {
    if (sortDirection === 'asc') {
      return 'angle-up';
    } else {
      return 'angle-down';
    }
  }
});
