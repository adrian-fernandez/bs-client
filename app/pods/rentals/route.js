import Ember from 'ember';
import ENV from 'bs-client/config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),

  queryParams: {
    q: {
      refreshModel: true
    },
    userFilter: {
      refreshModel: true
    },
    priceFromFilter: {
      refreshModel: true
    },
    priceToFilter: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    perPage: {
      refreshModel: true
    },
    sortField: {
      refreshModel: true
    },
    sortDirection: {
      refreshModel: true
    }
  },

  model(params) {
    const hash = {
      rentals: this.store.query('rental', {
        page: params.page,
        per_page: params.perPage,
        sort_field: params.sortField,
        sort_direction: params.sortDirection,
        q: params.q,
        user_filter: params.userFilter,
        price_from_filter: params.priceFromFilter,
        price_to_filter: params.priceToFilter//,
        // excluded_attributes: ['busy_days']
      }),
      rentalDailyRateRanges: this.rentalStatistics(),
      notFilteringPrice: (!params.priceFromFilter && !params.priceToFilter),
      priceFilter: [parseFloat(params.priceFromFilter), parseFloat(params.priceToFilter)]
    };

    return Ember.RSVP.hash(hash);
  },

  setupController(controller, model, params) {
    controller.set('rentals', model.rentals);
    controller.set('rentalFilter', params.queryParams.q);

    const defaultMaxDailyRate = Math.ceil(model.rentalDailyRateRanges.max_daily_rate);
    let defaultPriceRange = [];

    if (model.notFilteringPrice) {
      defaultPriceRange = [0, defaultMaxDailyRate];
    } else {
      defaultPriceRange = model.priceFilter;
    }

    controller.set('defaultMaxDailyRate', defaultMaxDailyRate);
    controller.set('defaultPriceRange', defaultPriceRange);
  },

  rentalStatistics() {
    const headers = this.get('session').authorize('authorizer:devise');
    return Ember.$.ajax({
      url: `${ENV.BACKEND_URL}/api/v1/rentals/rental_daily_rate_ranges`,
      type: 'GET',
      dataType: 'json',
      headers
    }).then((data) => {
      return data.rental_statistics;
    });
  },

  deactivate() {
    const controller = this.get('controller');
    controller.set('page', undefined);
    controller.set('perPage', undefined);
    controller.set('sortField', undefined);
    controller.set('sortDirection', undefined);
    controller.set('q', undefined);
    controller.set('userFilter', undefined);
    controller.set('priceFromFilter', undefined);
    controller.set('priceToFilter', undefined);
  }
});
