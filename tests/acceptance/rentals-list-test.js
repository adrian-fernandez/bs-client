/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'bs-client/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';
//import $ from 'jquery';

moduleForAcceptance('Acceptance | rentals list', {
  needs: [
    'model:me',
    'model:user',
    'model:rental',
    'model:booking',
    'model:permission'
  ]
});

test('requesting rentals to server', function(assert) {
  server.get('/rentals', function(db, request) {
    var params = request.queryParams;

    assert.equal(params.excluded_attributes.length, 1, 'excluded_attributes do not match the expected ones');
    assert.equal(params.excluded_attributes[0], 'busy_days', 'first excluded_attribute does not match the expected ones');
    assert.equal(params.page, 0, 'page does not match the expected one');
    assert.equal(params.sort_direction, 'asc', 'sort_direction does not match the expected one');
    assert.equal(params.sort_field, 'name', 'sort_field does not match the expected one');

    return db.rentals.all();
  });

  authenticateSession(this.application, { user_id: 1 });
  visit('/rentals');

  andThen(function() {
    assert.equal(currentURL(), '/rentals');
  });
});

test('listing rental as admin', function(assert) {
  const adminUser = server.create('user', 'adminUser');
  const normalUser = server.create('user', 'normalUser');

  authenticateSession(this.application, { user_id: 1 });

  server.get('/rentals', () => {
    return {
      'rentals': [
        { 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': normalUser.id },
        { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': adminUser.id }
      ],
      'users': [
        { 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'permissions': { 'admin': false }, 'role_ids': [1] },
        { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [2] }
      ],
      'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
    };
  });

  server.get('/users', (db, request) => {
    var params = request.queryParams;

    assert.equal(params.exclude_ids, adminUser.id, 'exclude_ids does not match the expected ones');
    assert.equal(params.paginate, 'false', 'paginate does not match the expected ones: ');
    assert.equal(params.selected_fields.length, 2, 'selected_fields does not match the expected one');
    assert.equal(params.selected_fields[0], 'id', 'first selected field does not match the expected one');
    assert.equal(params.selected_fields[1], 'email', 'second selected field does not match the expected one');

    return db.users.all();
  });

  server.get('/users/me', () => {
    return {
      user: adminUser,
      permissions: { 'admin': true }
    };
  });

  visit('/rentals');

  andThen(function() {
    assert.equal(find('[data-test-rental-book-btn]').length, 0, 'Admin should not see booking button');
    assert.equal(find('[data-test-rental-edit-btn]').length, 2, 'Admin should see edit button');
    assert.equal(find('[data-test-rental-delete-btn]').length, 2, 'Admin should see delete button');
    assert.ok(adminUser.isAdmin, 'user should be admin');
    assert.equal(find('[data-test-rental-tr]').length, 2, 'Admin should see two rentals');
    assert.equal(find('[data-test-rental-tr]:first td').length, 4, 'Admin should see 4 columns in table');
  });
});

test('listing rentals as owner', function(assert) {
  const normalUser = server.create('user', 'normalUser');
  const adminUser = server.create('user', 'adminUser');

  server.get('/rentals', () => {
    return {
      'rentals': [
        { 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': adminUser.id },
        { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': normalUser.id }
      ],
      'users': [
        { 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'permissions': { 'admin': false }, 'role_ids': [1] },
        { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [2] }
      ],
      'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
    };
  });

  authenticateSession(this.application, { user_id: normalUser.id });

  server.get('/users/me', () => { return { user: normalUser, permissions: { 'admin': false } }; });

  visit('/rentals');

  andThen(function() {
    assert.equal(find('[data-test-rental-book-btn]').length, 1, 'Owner should not see booking button');
    assert.equal(find('[data-test-rental-edit-btn]').length, 1, 'Owner should see edit button');
    assert.equal(find('[data-test-rental-delete-btn]').length, 1, 'Owner should see delete button');
    assert.equal(find('[data-test-rental-tr]').length, 2, 'Owner should see two rentals');
    assert.equal(find('tbody tr:first td').length, 3, 'Onwer should see 3 columns in table');
  });
});

test('listing rental as user', function(assert) {
  const adminUser = server.create('user', 'adminUser');
  const normalUser = server.create('user', 'normalUser');
  const normalUser2 = server.create('user', 'normalUser');

  server.get('/rentals', () => {
    return {
      'rentals': [
        { 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': normalUser2.id },
        { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': adminUser.id }
      ],
      'users': [
        { 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'permissions': { 'admin': false }, 'role_ids': [1] },
        { 'id': normalUser2.id, 'email': normalUser2.email, 'admin': normalUser2.admin, 'permissions': { 'admin': false }, 'role_ids': [1] },
        { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'permissions': { 'admin': true }, 'role_ids': [2] }
      ],
      'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
    };
  });

  authenticateSession(this.application, { user_id: normalUser.id });

  server.get('/users/me', () => { return { user: normalUser, permissions: { 'admin': false } }; });

  visit('/rentals');

  andThen(function() {
    assert.notOk(normalUser.isAdmin, 'user should not be admin');
    assert.equal(find('tbody tr:first td').length, 3, 'User should see 3 columns in table');

    assert.equal(find('[data-test-rental-delete-btn]').length, 0, 'User should not see delete button');
    assert.equal(find('[data-test-rental-tr]').length, 2, 'User should see two rentals');
    assert.equal(find('[data-test-rental-edit-btn]').length, 0, 'User should not see edit button');

    assert.equal(find('[data-test-rental-book-btn]').length, 2, 'User should see booking button');
  });
});

test('edit rental', function(assert) {
  const user = server.create('user', 'normalUser');

  server.get('/rentals', () => {
    return {
      'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 99.49, 'user_id': 1 }],
      'users': [{ 'id': 1, 'email': user.email, 'admin': user.admin, 'permissions': { 'admin': false }, 'role_ids': [1] }],
      'roles': [{ 'id': 1, 'name': 'user' }]
    };
  });

  authenticateSession(this.application, { user_id: user.id });

  server.get('/users/me', () => { return { user, permissions: { 'admin': false } }; });

  visit('/rentals');

  andThen(function() {
    assert.equal(find('[data-test-rental-edit-btn]').length, 1, 'Owner should see edit button');
    assert.equal(find('a.edit-btn').length, 1, 'Owner should see edit button');
  });

  click('[data-test-rental-edit-btn]');

  andThen(function() {
    assert.equal(find('[data-test-rental-new-dialog]').length, 1, 'User should see edit dialog');
    assert.equal(find('[data-test-rental-new-dialog-name-input]').length, 1, 'User should see name input');
    assert.equal(find('[data-test-rental-new-dialog-name-input]').val(), 'Rental sample name', 'Name should be loaded');
  });
});