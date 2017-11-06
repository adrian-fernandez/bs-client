'use strict';

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
    assert.ok(false, 'authenticators/bs-token.js should pass ESLint\n\n8:12 - \'isEmpty\' is not defined. (no-undef)\n8:30 - \'isEmpty\' is not defined. (no-undef)');
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
    assert.ok(true, 'components/x-login-form.js should pass ESLint\n\n');
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
    assert.ok(false, 'helpers/sort-icon.js should pass ESLint\n\n3:8 - Expected a function expression. (func-style)');
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
    assert.ok(true, 'instance-initializers/inject-store-in-components.js should pass ESLint\n\n5:3 - Expected method shorthand. (object-shorthand)');
  });

  QUnit.test('instance-initializers/permissions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/permissions.js should pass ESLint\n\n5:3 - Expected method shorthand. (object-shorthand)');
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
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n4:3 - Expected method shorthand. (object-shorthand)\n10:3 - Expected method shorthand. (object-shorthand)');
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
    assert.ok(true, 'services/endpoints.js should pass ESLint\n\n9:3 - Expected method shorthand. (object-shorthand)');
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
    assert.ok(true, 'transforms/object.js should pass ESLint\n\n5:3 - Expected method shorthand. (object-shorthand)\n13:3 - Expected method shorthand. (object-shorthand)');
  });
});
define('bs-client/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
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
define('bs-client/tests/helpers/ember-cli-clipboard', ['exports', 'ember-test'], function (exports, _emberTest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.triggerSuccess = triggerSuccess;
  exports.triggerError = triggerError;

  exports.default = function () {
    _emberTest.default.registerAsyncHelper('triggerCopySuccess', function (app) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.copy-btn';

      fireComponentActionFromApp(app, selector, 'success');
    });

    _emberTest.default.registerAsyncHelper('triggerCopyError', function (app) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.copy-btn';

      fireComponentActionFromApp(app, selector, 'error');
    });
  };

  var run = Ember.run;


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
define('bs-client/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'bs-client/tests/helpers/start-app', 'bs-client/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
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
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = Ember.RSVP.Promise;
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

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/module-for-acceptance.js should pass ESLint\n\n19:11 - \'afterEach\' is never reassigned. Use \'const\' instead. (prefer-const)');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/start-app.js should pass ESLint\n\n10:9 - \'application\' is never reassigned. Use \'const\' instead. (prefer-const)');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('bs-client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
