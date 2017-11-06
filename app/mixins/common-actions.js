import Ember from 'ember';
import ConfirmationController from 'bs-client/controllers/confirmation';

export default Ember.Mixin.create({
  doDelete(object, objectType) {
    const opts = {};
    opts.model = this.get('intl').findTranslationByKey(objectType + '.title');
    const confirmationController = ConfirmationController.create({
      titleText: this.get('intl').findTranslationByKey('flashes.' + objectType + 's.delete'),
      bodyText: this.get('intl').t('flashes.sure_to_delete', opts),
      submitButtonText: this.get('intl').findTranslationByKey('flashes.' + objectType + 's.delete'),
      isWarning: true,
      target: this.get('router')
    });

    confirmationController.openModal().then(confirmed => {
      opts.model = this.get('intl').findTranslationByKey('flashes.' + objectType + 's.the_rental');

      if (confirmed) {
        object.destroyRecord().then(() => {
          this.notifications.addNotification({
            message: this.get('intl').t('flashes.delete_success', opts),
            type: 'success',
            autoClear: true
          });
        });
      }
    });
  }
});
