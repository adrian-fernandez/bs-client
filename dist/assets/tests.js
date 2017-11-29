'use strict';

define('bs-client/tests/acceptance/bookings-list-test', ['qunit', 'bs-client/tests/helpers/module-for-acceptance', 'bs-client/tests/helpers/ember-simple-auth'], function (_qunit, _moduleForAcceptance, _emberSimpleAuth) {
  'use strict';

  (0, _moduleForAcceptance.default)('Acceptance | bookings list', {
    needs: ['model:me', 'model:user', 'model:booking', 'model:permission']
  }); /* global server */


  (0, _qunit.test)('requesting bookings to server', function (assert) {
    assert.equal(1, 1);

    server.get('/bookings', function (db, request) {
      var params = request.queryParams;

      assert.equal(params.date_filter, 'upcoming', 'date_filter do not match the expected ones');
      assert.equal(params.page, 0, 'page does not match the expected one');
      assert.equal(params.sort_direction, 'desc', 'sort_direction does not match the expected one');
      assert.equal(params.sort_field, 'start_at', 'sort_field does not match the expected one');

      return db.bookings.all();
    });

    server.get('/users/me', function () {
      return {};
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: 1 });
    visit('/bookings');

    andThen(function () {
      assert.equal(currentURL(), '/bookings');
    });
  });

  (0, _qunit.test)('listing started bookings as admin', function (assert) {
    var adminUser = server.create('user', 'adminUser');

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: adminUser.id });

    server.get('/bookings', function () {
      var today = new moment(new Date());
      var yesterday = today.add(-1, 'days');
      var tomorrow = today.add(1, 'days');

      return {
        'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 99.49, 'user_id': adminUser.id }],
        'bookings': [{ 'id': 1, 'rental_id': 1, 'start_at': yesterday.format('YYYY/MM/DD'), 'end_at': tomorrow.format('YYYY/MM/DD'), 'days': 1, 'price': 99.49, 'user_id': adminUser.id }],
        'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'admin' }]
      };
    });

    server.get('/users', function () {
      return {
        'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'admin' }]
      };
    });

    server.get('/users/me', function () {
      return { user: adminUser };
    });

    visit('/bookings');

    andThen(function () {
      assert.ok(adminUser.isAdmin, 'user should be admin');
      assert.equal(find('[data-test-booking-tr]').length, 1, 'Admin should see 3 bookings');
      assert.equal(find('[data-test-booking-tr]:first td').length, 7, 'Admin should see 7 columns in table');
      assert.equal(find('[data-test-booking-edit-btn]').length, 0, 'Started bookings should not be editables');
      assert.equal(find('[data-test-booking-delete-btn]').length, 0, 'Started bookings should not be deletables');
    });
  });

  (0, _qunit.test)('listing bookings as admin', function (assert) {
    var adminUser = server.create('user', 'adminUser');

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: adminUser.id });

    server.get('/bookings', function () {
      var today = new moment(new Date());
      var tomorrow = today.add(1, 'days');
      var nextWeek = today.add(7, 'days');

      return {
        'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 99.49, 'user_id': adminUser.id }],
        'bookings': [{ 'id': 1, 'rental_id': 1, 'start_at': tomorrow.format('YYYY/MM/DD'), 'end_at': nextWeek.format('YYYY/MM/DD'), 'days': 7, 'price': 696.43, 'user_id': adminUser.id }],
        'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'admin' }]
      };
    });

    server.get('/users', function () {
      return {
        'users': [{ 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'admin' }]
      };
    });

    server.get('/users/me', function () {
      return { user: adminUser };
    });

    visit('/bookings');

    andThen(function () {
      assert.ok(adminUser.isAdmin, 'user should be admin');
      assert.equal(find('[data-test-booking-tr]').length, 1, 'Admin should see 3 bookings');
      assert.equal(find('[data-test-booking-tr]:first td').length, 7, 'Admin should see 7 columns in table');
      assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Admin should see edit button');
      assert.equal(find('[data-test-booking-delete-btn]').length, 1, 'Admin should see delete button');
    });
  });

  (0, _qunit.test)('listing bookings as owner', function (assert) {
    var user = server.create('user', 'normalUser');

    server.get('/bookings', function () {
      var today = new moment(new Date());
      var tomorrow = today.add(1, 'days');
      var nextWeek = today.add(7, 'days');

      return {
        'bookings': [{ 'id': 1, 'start_at': tomorrow.format('YYYY/MM/DD'), 'end_at': nextWeek.format('YYYY/MM/DD'), 'days': 2, 'price': 20, 'user_id': user.id, 'rental_id': 1 }],
        'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 10, 'user_id': 1 }],
        'users': [{ 'id': user.id, 'email': user.email, 'admin': user.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'user' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: user.id });

    server.get('/users/me', function () {
      return { user: user };
    });

    visit('/bookings');

    andThen(function () {
      assert.equal(find('[data-test-booking-delete-btn]').length, 1, 'Owner should see delete button');
      assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Owner should see edit button');
      assert.equal(find('[data-test-booking-tr]').length, 1, 'Owner should see one booking');
      assert.equal(find('[data-test-booking-tr] td').length, 6, 'Onwer should see 6 columns in table');
    });
  });

  (0, _qunit.test)('edit booking', function (assert) {
    var user = server.create('user', 'normalUser');
    var today = new moment();
    var tomorrow = today.add(1, 'days');
    var nextWeek = today.add(7, 'days');
    var busyDay1 = today.add(10, 'days');

    server.get('/bookings', function () {
      return {
        'bookings': [{ 'id': 1, 'start_at': tomorrow, 'end_at': nextWeek, 'days': 2, 'price': 20, 'user_id': user.id, 'rental_id': 1 }],
        'rentals': [{ 'id': 1, 'name': 'Abshire LLC', 'daily_rate': 10, 'user_id': 1, 'busy_days': [busyDay1] }],
        'users': [{ 'id': user.id, 'email': user.email, 'admin': user.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'user' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: user.id });

    server.get('/users/me', function () {
      return { user: user };
    });

    visit('/bookings');

    andThen(function () {
      assert.equal(find('[data-test-booking-edit-btn]').length, 1, 'Owner should see edit button');
    });

    click('[data-test-booking-edit-btn]');

    andThen(function () {
      assert.equal(find('[data-test-booking-new-dialog]').length, 1, 'User should see edit dialog');
      assert.equal(find('[data-test-booking-form-rental-name-input]').length, 1, 'User should see rental select');
      assert.equal(find('[data-test-booking-dialog-from-date-div] input').length, 1, 'User should see \'from date\' input');
      assert.equal(find('[data-test-booking-dialog-to-date-div] input').length, 1, 'User should \'to date\' input');

      assert.equal(find('[data-test-booking-form-confirm-btn]').length, 1, 'User should see confirm button');
    });
  });
});
define('bs-client/tests/acceptance/login-test', ['qunit', 'bs-client/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  /* global server */
  (0, _moduleForAcceptance.default)('Acceptance | login', {
    needs: ['model:me', 'model:permission']
  });

  (0, _qunit.test)('visiting /login', function (assert) {
    server.post('/user_sessions.json', function (db, request) {
      if (request.params.session) {
        assert.equal(request.params.session.email, 'email_0@example.com', 'email does not match the expected one');
        assert.equal(request.params.session.password, 'password_0', 'password does not match the expected one');
      }

      return { 'user': { 'id': 2, 'email': 'admin@adrian-bs.com', 'admin': true, 'role_ids': [2] }, 'session': { 'id': 7, 'access_token': '2123a309fe681eab365b419aa7aa3b94', 'accessed_at': '2017-11-26', 'revoked_at': null, 'created_at': '2017-11-26T10:46:43.514Z' } };
    });

    server.get('/users/me', function () {
      return {};
    });

    visit('/');

    andThen(function () {
      assert.equal(currentURL(), '/');
    });

    fillIn('[data-test-signin-email-field]', 'email_0@example.com');
    fillIn('[data-test-signin-password-field]', 'password_0');
    assert.equal(find('[data-test-signin-submit-btn]').length, 0, 'Login button should be shown');
    assert.equal(find('[data-test-signout-link]').length, 0, 'Logout button should not be shown');

    andThen(function () {
      assert.equal(find('[data-test-signin-email-field]').val(), 'email_0@example.com');
      assert.equal(find('[data-test-signin-password-field]').val(), 'password_0');
    });

    click('[data-test-signin-submit-btn]');
  });
});
define('bs-client/tests/acceptance/rentals-list-test', ['qunit', 'bs-client/tests/helpers/module-for-acceptance', 'bs-client/tests/helpers/ember-simple-auth'], function (_qunit, _moduleForAcceptance, _emberSimpleAuth) {
  'use strict';

  //import $ from 'jquery';

  (0, _moduleForAcceptance.default)('Acceptance | rentals list', {
    needs: ['model:me', 'model:user', 'model:rental', 'model:booking', 'model:permission']
  }); /* global server */


  (0, _qunit.test)('listing rental as admin', function (assert) {
    var adminUser = server.create('user', 'adminUser');
    var normalUser = server.create('user', 'normalUser');

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: 1 });

    server.get('/rentals', function () {
      return {
        'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': normalUser.id }, { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': adminUser.id }],
        'users': [{ 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'role_ids': [1] }, { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [2] }],
        'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
      };
    });

    server.get('/users', function (db, request) {
      var params = request.queryParams;

      assert.equal(params.exclude_ids, adminUser.id, 'exclude_ids does not match the expected ones');
      assert.equal(params.paginate, 'false', 'paginate does not match the expected ones: ');
      assert.equal(params.selected_fields.length, 2, 'selected_fields does not match the expected one');
      assert.equal(params.selected_fields[0], 'id', 'first selected field does not match the expected one');
      assert.equal(params.selected_fields[1], 'email', 'second selected field does not match the expected one');

      return db.users.all();
    });

    server.get('/users/me', function () {
      return { user: adminUser };
    });

    visit('/rentals');

    andThen(function () {
      assert.equal(find('[data-test-rental-book-btn]').length, 0, 'Admin should not see booking button');
      assert.equal(find('[data-test-rental-edit-btn]').length, 2, 'Admin should see edit button');
      assert.equal(find('[data-test-rental-delete-btn]').length, 2, 'Admin should see delete button');
      assert.ok(adminUser.isAdmin, 'user should be admin');
      assert.equal(find('[data-test-rental-tr]').length, 2, 'Admin should see two rentals');
      assert.equal(find('[data-test-rental-tr]:first td').length, 4, 'Admin should see 4 columns in table');
    });
  });

  (0, _qunit.test)('listing rentals as owner', function (assert) {
    var normalUser = server.create('user', 'normalUser');
    var adminUser = server.create('user', 'adminUser');

    server.get('/rentals', function () {
      return {
        'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': adminUser.id }, { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': normalUser.id }],
        'users': [{ 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'role_ids': [1] }, { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [2] }],
        'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: normalUser.id });

    server.get('/users/me', function () {
      return { user: normalUser };
    });

    visit('/rentals');

    andThen(function () {
      assert.equal(find('[data-test-rental-book-btn]').length, 1, 'Owner should not see booking button');
      assert.equal(find('[data-test-rental-edit-btn]').length, 1, 'Owner should see edit button');
      assert.equal(find('[data-test-rental-delete-btn]').length, 1, 'Owner should see delete button');
      assert.equal(find('[data-test-rental-tr]').length, 2, 'Owner should see two rentals');
      assert.equal(find('tbody tr:first td').length, 3, 'Onwer should see 3 columns in table');
    });
  });

  (0, _qunit.test)('listing rental as user', function (assert) {
    var adminUser = server.create('user', 'adminUser');
    var normalUser = server.create('user', 'normalUser');
    var normalUser2 = server.create('user', 'normalUser');

    server.get('/rentals', function () {
      return {
        'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 5.50, 'user_id': normalUser2.id }, { 'id': 2, 'name': 'Rental sample name 2', 'daily_rate': 10.10, 'user_id': adminUser.id }],
        'users': [{ 'id': normalUser.id, 'email': normalUser.email, 'admin': normalUser.admin, 'role_ids': [1] }, { 'id': normalUser2.id, 'email': normalUser2.email, 'admin': normalUser2.admin, 'role_ids': [1] }, { 'id': adminUser.id, 'email': adminUser.email, 'admin': adminUser.admin, 'role_ids': [2] }],
        'roles': [{ 'id': 1, 'name': 'user' }, { 'id': 2, 'name': 'admin' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: normalUser.id });

    server.get('/users/me', function () {
      return { user: normalUser };
    });

    visit('/rentals');

    andThen(function () {
      assert.notOk(normalUser.isAdmin, 'user should not be admin');
      assert.equal(find('tbody tr:first td').length, 3, 'User should see 3 columns in table');

      assert.equal(find('[data-test-rental-delete-btn]').length, 0, 'User should not see delete button');
      assert.equal(find('[data-test-rental-tr]').length, 2, 'User should see two rentals');
      assert.equal(find('[data-test-rental-edit-btn]').length, 0, 'User should not see edit button');

      assert.equal(find('[data-test-rental-book-btn]').length, 2, 'User should see booking button');
    });
  });

  (0, _qunit.test)('edit rental', function (assert) {
    var user = server.create('user', 'normalUser');

    server.get('/rentals', function () {
      return {
        'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 99.49, 'user_id': user.id }],
        'users': [{ 'id': user.id, 'email': user.email, 'admin': user.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'user' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: user.id });

    server.get('/users/me', function () {
      return { user: user };
    });

    visit('/rentals');

    andThen(function () {
      assert.equal(find('[data-test-rental-edit-btn]').length, 1, 'Owner should see edit button');
      assert.equal(find('a.edit-btn').length, 1, 'Owner should see edit button');
    });

    click('[data-test-rental-edit-btn]');

    andThen(function () {
      assert.equal(find('[data-test-rental-new-dialog]').length, 1, 'User should see edit dialog');
      assert.equal(find('[data-test-rental-new-dialog-name-input]').length, 1, 'User should see name input');
      assert.equal(find('[data-test-rental-new-dialog-name-input]').val(), 'Rental sample name', 'Name should be loaded');
    });
  });

  (0, _qunit.test)('book a rental', function (assert) {
    var user = server.create('user', 'normalUser');
    var user2 = server.create('user', 'normalUser');
    var tomorrow = moment(new Date()).add(1, 'days');
    var after3Days = tomorrow.add(2, 'days');

    server.get('/rentals', function () {
      return {
        'rentals': [{ 'id': 1, 'name': 'Rental sample name', 'daily_rate': 99.49, 'user_id': user2.id, 'busy_days': [tomorrow.format('YYYY-MM-DD'), after3Days.format('YYYY-MM-DD')] }],
        'users': [{ 'id': user2.id, 'email': user2.email, 'admin': user2.admin, 'role_ids': [1] }],
        'roles': [{ 'id': 1, 'name': 'user' }]
      };
    });

    (0, _emberSimpleAuth.authenticateSession)(this.application, { user_id: user.id });

    server.get('/users/me', function () {
      return { user: user };
    });

    visit('/rentals');

    andThen(function () {
      assert.equal(find('[data-test-rental-book-btn]').length, 1, 'User should see book button');
    });

    click('[data-test-rental-book-btn]');

    andThen(function () {
      assert.equal(currentURL(), '/rentals/' + 1 + '/book');
      assert.equal(find('[data-test-booking-new-dialog]').length, 1, 'User should see booking dialog');
      assert.equal(find('[data-test-booking-form-rental-name-input]').length, 1, 'User should see rental input');
      assert.equal(find('[data-test-booking-dialog-from-date-div] input').length, 1, 'User should see \'from date\' input');
      assert.equal(find('[data-test-booking-dialog-to-date-div] input').length, 1, 'User should see \'to date\' input');
    });
  });
});
define('bs-client/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('abilities/booking.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'abilities/booking.js should pass ESLint\n\n');
  });

  QUnit.test('abilities/generic.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'abilities/generic.js should pass ESLint\n\n');
  });

  QUnit.test('abilities/rental.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'abilities/rental.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/user.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/bs-token.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/bs-token.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/devise.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/devise.js should pass ESLint\n\n');
  });

  QUnit.test('authorizers/devise.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/devise.js should pass ESLint\n\n');
  });

  QUnit.test('components/date-picker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/date-picker.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-loading.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-loading.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-login-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/x-login-form.js should pass ESLint\n\n2:8 - \'ENV\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/x-navigation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-navigation.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-paginator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-paginator.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-table.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/confirmation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/confirmation.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/modal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/modal.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/sort-icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/sort-icon.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/accounting.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/accounting.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/inject-endpoints.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/inject-endpoints.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/inject-notifications.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/inject-notifications.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/current-user.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/inject-router-in-components.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/inject-router-in-components.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/inject-store-in-components.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/inject-store-in-components.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/permissions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/permissions.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/base-date-picker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/base-date-picker.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/booking-actions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/booking-actions.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/common-actions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/common-actions.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/current-user.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/error-generator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/error-generator.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/filters-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/filters-mixin.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/rental-actions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/rental-actions.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/route-error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/route-error.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/users-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/users-mixin.js should pass ESLint\n\n');
  });

  QUnit.test('models/booking.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/booking.js should pass ESLint\n\n');
  });

  QUnit.test('models/rental.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/rental.js should pass ESLint\n\n');
  });

  QUnit.test('models/role.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/role.js should pass ESLint\n\n');
  });

  QUnit.test('models/user-session.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user-session.js should pass ESLint\n\n');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('pods/application/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/application/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/edit/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/edit/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/new/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/new/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/bookings/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/bookings/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/landing/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/landing/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/landing/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/landing/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/book/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/book/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/book/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/book/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/edit/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/edit/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/new/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/new/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/rentals/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/rentals/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/sign-in/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sign-in/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/sign-out/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sign-out/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/sign-up/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sign-up/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/sign-up/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sign-up/route.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/booking.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/booking.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/rental.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/rental.js should pass ESLint\n\n');
  });

  QUnit.test('services/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-user.js should pass ESLint\n\n');
  });

  QUnit.test('services/endpoints.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/endpoints.js should pass ESLint\n\n');
  });

  QUnit.test('services/modal-manager.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/modal-manager.js should pass ESLint\n\n');
  });

  QUnit.test('services/permissions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/permissions.js should pass ESLint\n\n');
  });

  QUnit.test('services/session.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/session.js should pass ESLint\n\n');
  });

  QUnit.test('transforms/array.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/array.js should pass ESLint\n\n');
  });

  QUnit.test('transforms/object.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/object.js should pass ESLint\n\n');
  });
});
define('bs-client/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function destroyApp(application) {
    Ember.run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  });
});
define('bs-client/tests/helpers/ember-basic-dropdown', ['exports', 'ember-basic-dropdown/test-support/helpers', 'ember-native-dom-helpers'], function (exports, _helpers, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = exports.fireKeydown = exports.tapTrigger = exports.clickTrigger = exports.nativeTap = undefined;
  Object.defineProperty(exports, 'nativeTap', {
    enumerable: true,
    get: function () {
      return _helpers.nativeTap;
    }
  });
  Object.defineProperty(exports, 'clickTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.clickTrigger;
    }
  });
  Object.defineProperty(exports, 'tapTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.tapTrigger;
    }
  });
  Object.defineProperty(exports, 'fireKeydown', {
    enumerable: true,
    get: function () {
      return _helpers.fireKeydown;
    }
  });
  exports.default = _helpers.default;
  var nativeClick = exports.nativeClick = _emberNativeDomHelpers.click;
});
define('bs-client/tests/helpers/ember-cli-clipboard', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.triggerSuccess = triggerSuccess;
  exports.triggerError = triggerError;

  exports.default = function () {
    Test.registerAsyncHelper('triggerCopySuccess', function (app) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.copy-btn';

      fireComponentActionFromApp(app, selector, 'success');
    });

    Test.registerAsyncHelper('triggerCopyError', function (app) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.copy-btn';

      fireComponentActionFromApp(app, selector, 'error');
    });
  };

  var run = Ember.run;
  var Test = Ember.Test;


  /* === Integration Test Helpers === */

  /**
   * Fires `success` action for an instance of a copy-button component
   * @function triggerSuccess
   * @param {Object} context - integration test’s this context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Void}
   */
  function triggerSuccess(context, selector) {
    fireComponentAction(context, selector, 'success');
  }

  /**
   * Fires `error` action for an instance of a copy-button component
   * @function triggerError
   * @param {Object} context - integration test’s this context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Void}
   */
  function triggerError(context, selector) {
    fireComponentAction(context, selector, 'error');
  }

  /* === Acceptance Test Helpers === */

  /**
   * Default export is a function that registers acceptance test helpers
   */


  /* === Private Functions === */

  /**
   * Fires named action for an instance of a copy-button component in an app
   * @function fireComponentActionFromApp
   * @param {Object} app - Ember application
   * @param {String|Element} selector - selector of the copy-button instance
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireComponentActionFromApp(app, selector, actionName) {
    fireComponentAction({
      container: app.__container__,
      $: app.$
    }, selector, actionName);
  }

  /**
   * Fires named action for an instance of a copy-button component
   * @function fireComponentAction
   * @param {Object} context - test context
   * @param {String|Element} selector - selector of the copy-button instance
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireComponentAction(context, selector, actionName) {
    var component = getComponentBySelector(context, selector);
    fireActionByName(component, actionName);
  }

  /**
   * Fetches component reference for a given context and selector
   * @function getComponentBySelector
   * @param {Object} context - test context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Object} component object
   */
  function getComponentBySelector(context) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.copy-btn';

    var emberId = context.$(selector).attr('id');
    return context.container.lookup('-view-registry:main')[emberId];
  }

  /**
   * Fires a component's action given an action name
   * @function fireActionByName
   * @param {Ember.Component} component - component to fire action from
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireActionByName(component, actionName) {
    var action = component[actionName];

    run(function () {
      if (typeof action === 'string') {
        component.sendAction(action);
      } else {
        action();
      }
    });
  }
});
define('bs-client/tests/helpers/ember-keyboard/register-test-helpers', ['exports', 'ember-keyboard', 'ember-keyboard/fixtures/modifiers-array', 'ember-keyboard/utils/get-cmd-key'], function (exports, _emberKeyboard, _modifiersArray, _getCmdKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    Ember.Test.registerAsyncHelper('keyDown', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keydown', element);
    });

    Ember.Test.registerAsyncHelper('keyUp', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keyup', element);
    });

    Ember.Test.registerAsyncHelper('keyPress', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keypress', element);
    });
  };

  var keyEvent = function keyEvent(app, attributes, type, element) {
    var event = attributes.split('+').reduce(function (event, attribute) {
      if (_modifiersArray.default.indexOf(attribute) > -1) {
        attribute = attribute === 'cmd' ? (0, _getCmdKey.default)() : attribute;
        event[attribute + 'Key'] = true;
      } else {
        event.keyCode = (0, _emberKeyboard.getKeyCode)(attribute);
      }

      return event;
    }, {});

    return app.testHelpers.triggerEvent(element || document, type, event);
  };
});
define('bs-client/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  Object.defineProperty(exports, 'findContains', {
    enumerable: true,
    get: function () {
      return _helpers.findContains;
    }
  });
  Object.defineProperty(exports, 'nativeMouseDown', {
    enumerable: true,
    get: function () {
      return _helpers.nativeMouseDown;
    }
  });
  Object.defineProperty(exports, 'nativeMouseUp', {
    enumerable: true,
    get: function () {
      return _helpers.nativeMouseUp;
    }
  });
  Object.defineProperty(exports, 'triggerKeydown', {
    enumerable: true,
    get: function () {
      return _helpers.triggerKeydown;
    }
  });
  Object.defineProperty(exports, 'typeInSearch', {
    enumerable: true,
    get: function () {
      return _helpers.typeInSearch;
    }
  });
  Object.defineProperty(exports, 'clickTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.clickTrigger;
    }
  });
  Object.defineProperty(exports, 'nativeTouch', {
    enumerable: true,
    get: function () {
      return _helpers.nativeTouch;
    }
  });
  Object.defineProperty(exports, 'touchTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.touchTrigger;
    }
  });
  Object.defineProperty(exports, 'selectChoose', {
    enumerable: true,
    get: function () {
      return _helpers.selectChoose;
    }
  });
  exports.default = _helpers.default;
});
define('bs-client/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _test) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;


  var TEST_CONTAINER_KEY = 'authenticator:test'; /* global wait */

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
define('bs-client/tests/helpers/ember-sortable/test-helpers', ['ember-sortable/helpers/drag', 'ember-sortable/helpers/reorder'], function () {
  'use strict';
});
define('bs-client/tests/helpers/ember-test-selectors', ['exports', 'ember-test-selectors'], function (exports, _emberTestSelectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var deprecate = Ember.deprecate;


  var message = 'Importing testSelector() from "<appname>/tests/helpers/ember-test-selectors" is deprecated. ' + 'Please import testSelector() from "ember-test-selectors" instead.';

  deprecate(message, false, {
    id: 'ember-test-selectors.test-selector-import',
    until: '0.2.0',
    url: 'https://github.com/simplabs/ember-test-selectors#usage'
  });

  exports.default = _emberTestSelectors.default;
});
define('bs-client/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'bs-client/tests/helpers/start-app'], function (exports, _qunit, _startApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        Ember.run(this.application, 'destroy');
        if (window.server) {
          window.server.shutdown();
        }
      }
    });
  };
});
define('bs-client/tests/helpers/resolver', ['exports', 'bs-client/resolver', 'bs-client/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('bs-client/tests/helpers/start-app', ['exports', 'bs-client/app', 'bs-client/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('bs-client/tests/helpers/validate-properties', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.testValidPropertyValues = testValidPropertyValues;
  exports.testInvalidPropertyValues = testInvalidPropertyValues;


  var run = Ember.run;

  function validateValues(object, propertyName, values, isTestForValid) {
    var promise = null;
    var validatedValues = [];

    values.forEach(function (value) {
      function handleValidation(errors) {
        var hasErrors = object.get('errors.' + propertyName + '.firstObject');
        if (hasErrors && !isTestForValid || !hasErrors && isTestForValid) {
          validatedValues.push(value);
        }
      }

      run(object, 'set', propertyName, value);

      var objectPromise = null;
      run(function () {
        objectPromise = object.validate().then(handleValidation, handleValidation);
      });

      // Since we are setting the values in a different run loop as we are validating them,
      // we need to chain the promises so that they run sequentially. The wrong value will
      // be validated if the promises execute concurrently
      promise = promise ? promise.then(objectPromise) : objectPromise;
    });

    return promise.then(function () {
      return validatedValues;
    });
  }

  function testPropertyValues(propertyName, values, isTestForValid, context) {
    var validOrInvalid = isTestForValid ? 'Valid' : 'Invalid';
    var testName = validOrInvalid + ' ' + propertyName;

    (0, _emberQunit.test)(testName, function (assert) {
      var object = this.subject();

      if (context && typeof context === 'function') {
        context(object);
      }

      // Use QUnit.dump.parse so null and undefined can be printed as literal 'null' and
      // 'undefined' strings in the assert message.
      var valuesString = QUnit.dump.parse(values).replace(/\n(\s+)?/g, '').replace(/,/g, ', ');
      var assertMessage = 'Expected ' + propertyName + ' to have ' + validOrInvalid.toLowerCase() + ' values: ' + valuesString;

      return validateValues(object, propertyName, values, isTestForValid).then(function (validatedValues) {
        assert.deepEqual(validatedValues, values, assertMessage);
      });
    });
  }

  function testValidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, true, context);
  }

  function testInvalidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, false, context);
  }
});
define('bs-client/tests/test-helper', ['bs-client/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('bs-client/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/bookings-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/bookings-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/rentals-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/rentals-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/booking-test.js should pass ESLint\n\n');
  });
});
define('bs-client/tests/unit/models/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  var get = Ember.get;


  (0, _emberQunit.moduleForModel)('booking', 'Unit | Model | booking', {
    needs: ['service:validations', 'model:user', 'model:rental', 'ember-validations@validator:local/presence']
  });

  (0, _emberQunit.test)('\'hasStarted\' returns true if booking has started today or before', function (assert) {
    var today = new Date();

    var booking = this.subject({ startAt: today });
    assert.equal(get(booking, 'hasStarted'), true);
  });

  (0, _emberQunit.test)('\'hasStarted\' returns false if booking is going to start tomorrow', function (assert) {
    var tomorrow = moment(new Date()).add(1, 'days');

    var booking = this.subject({ startAt: tomorrow });
    assert.equal(get(booking, 'hasStarted'), false);
  });

  (0, _emberQunit.test)('\'hasEnded\' returns true if booking has ended today or before', function (assert) {
    var today = new Date();

    var booking = this.subject({ endAt: today });
    assert.equal(get(booking, 'hasEnded'), true);
  });

  (0, _emberQunit.test)('\'hasEnded\' returns false if booking is going to end tomorrow', function (assert) {
    var tomorrow = moment(new Date()).add(1, 'days');

    var booking = this.subject({ endAt: tomorrow });
    assert.equal(get(booking, 'hasEnded'), false);
  });

  (0, _emberQunit.test)('\'isNow\' returns false if booking has ended yesterday', function (assert) {
    var day1 = moment(new Date()).add(-2, 'days');
    var day2 = moment(new Date()).add(-1, 'days');

    var booking = this.subject({ startAt: day1, endAt: day2 });
    assert.equal(get(booking, 'isNow'), false);
  });

  (0, _emberQunit.test)('\'isNow\' returns false if booking is going to start tomorrow', function (assert) {
    var day1 = moment(new Date()).add(1, 'days');
    var day2 = moment(new Date()).add(2, 'days');

    var booking = this.subject({ startAt: day1, endAt: day2 });
    assert.equal(get(booking, 'isNow'), false);
  });

  (0, _emberQunit.test)('\'isNow\' returns true if booking has started but has not ended yet', function (assert) {
    var day1 = moment(new Date()).add(-1, 'days');
    var day2 = moment(new Date()).add(1, 'days');

    var booking = this.subject({ startAt: day1, endAt: day2 });
    assert.equal(get(booking, 'isNow'), true);
  });
});
require('bs-client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
