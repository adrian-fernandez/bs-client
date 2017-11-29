/* eslint-env node */
'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'bs-client',
    podModulePrefix: 'bs-client/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      environment,
      FEATURES: {
        'link-to': true
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {
    },

    moment: {
      includeTimezone: 'all',
      outputFormat: 'LLLL',
      allowEmpty: true // default: false
    },

    BACKEND_URL: process.env.BACKEND_URL
  };

  if (environment === 'development' || environment === 'production') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  } else if (environment === 'test') {
    ENV['ember-cli-mirage'] = {
      discoverEmberDataModels: true
    };
  }

  if (environment === 'development') {
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.LOG_STACKTRACE_ON_DEPRECATION = true;
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'acceptance') {
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
  }

  return ENV;
};
