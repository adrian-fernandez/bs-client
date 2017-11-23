import { Factory, association } from 'ember-cli-mirage';

export default Factory.extend({
  name: (i) => `rental_${i}`,
  dailyRate: (i) => (i + 1),
  user: association()
});
