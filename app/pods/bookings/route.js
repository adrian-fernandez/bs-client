import Ember from 'ember';
import CurrentUser from 'bs-client/mixins/current-user';

export default Ember.Route.extend(CurrentUser, {
  intl: Ember.inject.service(),

  queryParams: {
    q: {
      refreshModel: true
    },
    sortField: {
      refreshModel: true
    },
    sortDirection: {
      refreshModel: true
    },
    dateFilter: {
      refreshModel: true
    },
    fromFilter: {
      refreshModel: true
    },
    toFilter: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    perPage: {
      refreshModel: true
    }
  },

  model(params) {
    const hash = {
      bookings: this.store.query('booking', {
        q: params.q,
        sort_field: params.sortField,
        sort_direction: params.sortDirection,
        date_filter: params.dateFilter,
        from_filter: params.fromFilter,
        to_filter: params.toFilter,
        page: params.page,
        per_page: params.perPage
      })
    };

    return Ember.RSVP.hash(hash);
  },

  setupController(controller, model) {
    controller.setProperties(model);
  },

  deactivate() {
    const controller = this.get('controller');
    controller.set('q', undefined);
    controller.set('sortField', undefined);
    controller.set('sortDirection', undefined);
    controller.set('dateFilter', undefined);
    controller.set('fromFilter', undefined);
    controller.set('toFilter', undefined);
    controller.set('from', undefined);
    controller.set('to', undefined);
    controller.set('page', undefined);
    controller.set('perPage', undefined);
  }

});
