import Ember from 'ember';

export function sortIcon([column, sortField, sortDirection]) {
  if (sortField !== column) {
    return 'fa-sort';
  } else {
    if (sortDirection === 'asc') {
      return 'angle-up';
    } else {
      return 'angle-down';
    }
  }
}

export default Ember.Helper.helper(sortIcon);
