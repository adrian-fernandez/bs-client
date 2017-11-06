import Ember from 'ember';

const errorKeyFormatter = function(key) {
  return Ember.String.capitalize(Ember.String.decamelize(key).replace(/_/g, ' '));
};

export default Ember.Mixin.create({
  intl: Ember.inject.service(),

  generateErrors(errors) {
    let errorText = '';

    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        if (error.source) {
          const title = error.source.pointer.split('/').get('lastObject');

          errorText += `${errorKeyFormatter(title)} ${error.detail}\n`;
        }
      });
    } else {
      Object.keys(errors).forEach((errorKey) => {
        if (errors[errorKey] && Array.isArray(errors[errorKey]) && errors[errorKey].length > 0) {
          errors[errorKey].forEach((error) => {
            errorText += errorKeyFormatter(errorKey) + ' ' + error + '\n';
          });
        }
      });
    }

    return errorText.length > 0 ? errorText : this.get('intl').t('errors.default_notification_error');
  }
});
