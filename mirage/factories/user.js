import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({
  password: (i) => `password_${i}`,
  passwordConfirmation: (i) => `password_${i}`,
  email: (i) => `email_${i}@example.com`,

  adminUser: trait({
    admin: true,
    isAdmin: true
  }),

  normalUser: trait({
    admin: false,
    isAdmin: false
  })
});
