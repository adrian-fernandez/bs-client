import Ember from 'ember';

export default Ember.Mixin.create({
  allUsersExceptMe: Ember.computed(function() {
    return this.get('store').query('user',
      {
        exclude_ids: this.get('currentUser.user.id'),
        paginate: false,
        selected_fields: ['id', 'email'],
        exclude_role_ids: this.get('currentUser.user.role_id')
      }
    );
  })
});
