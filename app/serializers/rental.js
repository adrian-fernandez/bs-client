import ApplicationSerializer from 'bs-client/serializers/application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    bookings: { serialize: 'ids' },
    user: { serialize: 'id' }
  }
});
