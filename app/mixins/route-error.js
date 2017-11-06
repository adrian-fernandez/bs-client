import Ember from 'ember';

export default Ember.Mixin.create({
  emberDataErrorHandlers: {
    401: () => {
      this.transitionTo('landing');
    },

    404: () => {
      this.transitionTo('404');
    },

    500: () => {
      this.transitionTo('error');
    }
  },

  handlePlainJavaScriptError() {
    this.transitionTo('error');
  },

  handleResponseError(error) {
    if (error && error.status) {
      const handler = this.emberDataErrorHandlers[error.status];

      if (handler) {
        handler.call(this, error);
      }
    }
  },

  handleEmberDataAdapterError(adapterError) {
    const error = adapterError.errors[0];

    this.handleResponseError(error);
  },

  handleError(error, transition) {
    if (error && (error.isAdapterError || Ember.isArray(error.errors))) {
      this.handleEmberDataAdapterError(error, transition);
    } else if (error) {
      if (error.status) {
        this.handleResponseError(error, transition);
      } else {
        this.handlePlainJavaScriptError(error, transition);
      }
    }

    return true;
  },

  actions: {
    error(error, transition) {
      return this.handleError(error, transition);
    }
  }
});
