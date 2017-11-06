import Ember from 'ember';
import CurrentUser from 'bs-client/mixins/current-user';

export default Ember.Route.extend(CurrentUser, {
  beforeModel() {
    this.get('session').invalidate().then(() => {
      this.signOut();
    });
  }
});
