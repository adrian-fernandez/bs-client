/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'bs-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login', {
  needs: [
    'model:me',
    'model:permission'
  ]
});

test('visiting /login', function(assert) {
  server.post('/user_sessions.json', function(db, request) {
    if (request.params.session) {
      assert.equal(request.params.session.email, 'email_0@example.com', 'email does not match the expected one');
      assert.equal(request.params.session.password, 'password_0', 'password does not match the expected one');
    }

    return {'user': {'id': 2, 'email': 'admin@adrian-bs.com', 'admin': true, 'role_ids': [2]}, 'session': { 'id': 7, 'access_token': '2123a309fe681eab365b419aa7aa3b94', 'accessed_at': '2017-11-26', 'revoked_at': null, 'created_at': '2017-11-26T10:46:43.514Z'}};
  });

  server.get('/users/me', () => { return {  }; });

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });

  fillIn('[data-test-signin-email-field]', 'email_0@example.com');
  fillIn('[data-test-signin-password-field]', 'password_0');
  assert.equal(find('[data-test-signin-submit-btn]').length, 0, 'Login button should be shown');
  assert.equal(find('[data-test-signout-link]').length, 0, 'Logout button should not be shown');

  andThen(function() {
    assert.equal(find('[data-test-signin-email-field]').val(), 'email_0@example.com');
    assert.equal(find('[data-test-signin-password-field]').val(), 'password_0');
  });

  click('[data-test-signin-submit-btn]');
});
