import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bs-client/config/environment';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  host: ENV.BACKEND_URL,
  namespace: 'api/v1',
  coalesceFindRequests: true,
  authorizer: 'authorizer:devise'
});
