import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('404');
  this.route('landing', { path: '/' });
  this.route('external-feedback');
  this.route('sign_in');
  this.route('sign_up');
  this.route('sign_out');

  this.route('rentals', function() {
    this.route('new');
    this.route('edit', { path: '/:rental_id/edit' });
    this.route('bookings', { path: '/:rental_id/bookings' });
    this.route('book', { path: '/:rental_id/book'});
  });

  this.route('bookings', function() {
    this.route('edit', { path: '/:booking_id/edit' });
  });
});

export default Router;
