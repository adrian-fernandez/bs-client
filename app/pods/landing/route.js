import Ember from 'ember';
import CurrentUser from 'bs-client/mixins/current-user';

export default Ember.Route.extend(CurrentUser, {
  actions: {
    authenticate() {
      const identification = this.get('controller.identification'),
        password = this.get('controller.password');

      this.send('doNotRenderLayout');
      this.signIn(identification, password, this.get('redirect_uri'));
    }
  }
});
