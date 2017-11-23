/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'bs-client/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | bookings list', {
  needs: [
    'model:me',
    'model:user',
    'model:booking',
    'model:permission'
  ]
});

test('requesting bookings to server', function(assert) {
  assert.equal(1, 1);

  server.get('/bookings', function(db, request) {
    var params = request.queryParams;

    assert.equal(params.date_filter, 'upcoming', 'date_filter do not match the expected ones');
    assert.equal(params.page, 0, 'page does not match the expected one');
    assert.equal(params.sort_direction, 'desc', 'sort_direction does not match the expected one');
    assert.equal(params.sort_field, 'start_at', 'sort_field does not match the expected one');

    return db.bookings.all();
  });

  authenticateSession(this.application, { user_id: 1 });
  visit('/bookings');

  andThen(function() {
    assert.equal(currentURL(), '/bookings');
  });
});

test('listing started bookings as admin', function(assert) {
  const adminUser = server.create('user', 'adminUser');

  authenticateSession(this.application, { user_id: adminUser.id });

  server.get('/bookings', () => {
    const today = new moment(new Date());
    const yesterday = today.add(-1, 'days');
    const tomorrow = today.add(1, 'days');

    return {
      'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 99.49, 'user_id': adminUser.id }],
      'bookings': [{ 'id': 1, 'rental_id': 1, 'start_at': yesterday.format('YYYY/MM/DD'), 'end_at': tomorrow.format('YYYY/MM/DD'), 'days': 1, 'price': 99.49, 'user_id': adminUser.id }],
      'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'admin' }]
    };
  });

  server.get('/users', () => {
    return {
      'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'admin' }]
    };
  });

  server.get('/users/me', () => { return { user: adminUser, permissions: { 'admin': true } }; });

  visit('/bookings');

  andThen(function() {
    assert.ok(adminUser.isAdmin, 'user should be admin');
    assert.equal(find('[data-test-booking-tr]').length, 1, 'Admin should see 3 bookings');
    assert.equal(find('[data-test-booking-tr]:first td').length, 7, 'Admin should see 7 columns in table');
    assert.equal(find('[data-test-booking-edit-btn]').length, 0, 'Started bookings should not be editables');
    assert.equal(find('[data-test-booking-delete-btn]').length, 0, 'Started bookings should not be deletables');
  });
});

test('listing bookings as admin', function(assert) {
  const adminUser = server.create('user', 'adminUser');

  authenticateSession(this.application, { user_id: adminUser.id });

  server.get('/bookings', () => {
    const today = new moment(new Date());
    const tomorrow = today.add(1, 'days');
    const nextWeek = today.add(7, 'days');

    return {
      'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 99.49, 'user_id': adminUser.id }],
      'bookings': [{ 'id': 1, 'rental_id': 1, 'start_at': tomorrow.format('YYYY/MM/DD'), 'end_at': nextWeek.format('YYYY/MM/DD'), 'days': 7, 'price': 696.43, 'user_id': adminUser.id }],
      'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'admin' }]
    };
  });

  server.get('/users', () => {
    return {
      'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'admin' }]
    };
  });

  server.get('/users/me', () => { return { user: adminUser, permissions: { 'admin': true } }; });

  visit('/bookings');

  andThen(function() {
    assert.ok(adminUser.isAdmin, 'user should be admin');
    assert.equal(find('[data-test-booking-tr]').length, 1, 'Admin should see 3 bookings');
    assert.equal(find('[data-test-booking-tr]:first td').length, 7, 'Admin should see 7 columns in table');
    assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Admin should see edit button');
    assert.equal(find('[data-test-booking-delete-btn]').length, 1, 'Admin should see delete button');
  });
});

test('listing bookings as owner', function(assert) {
  const user = server.create('user', 'normalUser');

  server.get('/bookings', () => {
    const today = new moment(new Date());
    const tomorrow = today.add(1, 'days');
    const nextWeek = today.add(7, 'days');

    return {
      'bookings': [{ 'id': 1, 'start_at': tomorrow.format('YYYY/MM/DD'), 'end_at': nextWeek.format('YYYY/MM/DD'), 'days': 2, 'price': 20, 'user_id': user.id, 'rental_id': 1 }],
      'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 10, 'user_id': 1 }],
      'users': [{ 'id': user.id, 'email': user.email, 'admin': user.admin, 'permissions': { 'admin': false }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'user' }]
    };
  });

  authenticateSession(this.application, { user_id: user.id });

  server.get('/users/me', () => { return { user, permissions: { 'admin': false } }; });

  visit('/bookings');

  andThen(function() {
    assert.equal(find('[data-test-booking-delete-btn]').length, 1, 'Owner should see delete button');
    assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Owner should see edit button');
    assert.equal(find('[data-test-booking-tr]').length, 1, 'Owner should see one booking');
    assert.equal(find('[data-test-booking-tr] td').length, 6, 'Onwer should see 6 columns in table');
  });
});

test('edit booking', function(assert) {
  const user = server.create('user', 'normalUser');
  const today = new moment(new Date());
  const tomorrow = today.add(1, 'days');
  const nextWeek = today.add(7, 'days');
  const busyDay1 = today.add(10, 'days');

  server.get('/bookings', () => {
    return {
      'bookings': [{ 'id': 1, 'start_at': tomorrow.format('YYYY/MM/DD'), 'end_at': nextWeek.format('YYYY/MM/DD'), 'days': 2, 'price': 20, 'user_id': user.id, 'rental_id': 1 }],
      'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 10, 'user_id': 1, 'busy_days': [busyDay1.format('YYYY/MM/DD')] }],
      'users': [{ 'id': user.id, 'email': user.email, 'admin': user.admin, 'permissions': { 'admin': false }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'user' }]
    };
  });

  authenticateSession(this.application, { user_id: user.id });

  server.get('/users/me', () => { return { user, permissions: { 'admin': false } }; });

  visit('/bookings');

  andThen(function() {
    assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Owner should see edit button');
  });

  click('[data-test-booking-edit-btn]');

  andThen(function() {
    assert.equal(find('[data-test-booking-new-dialog]').length, 1, 'User should see edit dialog');
    assert.equal(find('[data-test-booking-form-rental-name-input]').length, 1, 'User should see rental select');
    assert.equal(find('[data-test-booking-dialog-from-date-div] input').length, 1, 'User should see \'from date\' input');
    assert.equal(find('[data-test-booking-dialog-to-date-div] input').length, 1, 'User should \'to date\' input');

    assert.equal(find('[data-test-booking-form-confirm-btn]').length, 1, 'User should see confirm button');
  });
});

