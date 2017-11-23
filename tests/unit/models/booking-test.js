import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('booking', 'Unit | Model | booking', {
  needs: [
    'service:validations',
    'model:user',
    'model:rental',
    'ember-validations@validator:local/presence'
  ]
});

test('\'hasStarted\' returns true if booking has started today or before', function(assert) {
  const today = new Date();

  const booking = this.subject({startAt: today});
  assert.equal(get(booking, 'hasStarted'), true);
});

test('\'hasStarted\' returns false if booking is going to start tomorrow', function(assert) {
  const tomorrow = moment(new Date()).add(1, 'days');

  const booking = this.subject({startAt: tomorrow});
  assert.equal(get(booking, 'hasStarted'), false);
});

test('\'hasEnded\' returns true if booking has ended today or before', function(assert) {
  const today = new Date();

  const booking = this.subject({endAt: today});
  assert.equal(get(booking, 'hasEnded'), true);
});

test('\'hasEnded\' returns false if booking is going to end tomorrow', function(assert) {
  const tomorrow = moment(new Date()).add(1, 'days');

  const booking = this.subject({endAt: tomorrow});
  assert.equal(get(booking, 'hasEnded'), false);
});

test('\'isNow\' returns false if booking has ended yesterday', function(assert) {
  const day1 = moment(new Date()).add(-2, 'days');
  const day2 = moment(new Date()).add(-1, 'days');

  const booking = this.subject({startAt: day1, endAt: day2});
  assert.equal(get(booking, 'isNow'), false);
});

test('\'isNow\' returns false if booking is going to start tomorrow', function(assert) {
  const day1 = moment(new Date()).add(1, 'days');
  const day2 = moment(new Date()).add(2, 'days');

  const booking = this.subject({startAt: day1, endAt: day2});
  assert.equal(get(booking, 'isNow'), false);
});

test('\'isNow\' returns true if booking has started but has not ended yet', function(assert) {
  const day1 = moment(new Date()).add(-1, 'days');
  const day2 = moment(new Date()).add(1, 'days');

  const booking = this.subject({startAt: day1, endAt: day2});
  assert.equal(get(booking, 'isNow'), true);
});
