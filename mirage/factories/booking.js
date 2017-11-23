import { Factory, association } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name: (i) => `rental_${i}`,
  dailyRate: (i) => (i + 1),
  user: association(),
  rental: association(),

  hasStarted() {
    return moment(this.startAt) <= moment(new Date());
  }
});
