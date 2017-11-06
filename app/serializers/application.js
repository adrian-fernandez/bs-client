import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key, attribute) {
    if (!attribute.options.readOnly) {
      return this._super(record, json, key, attribute);
    }
  },

  serializeBelongsTo: function(record, json, relationship) {
    if (!relationship.options.readOnly) {
      return this._super(record, json, relationship);
    }
  }
});
