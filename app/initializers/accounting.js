import { currency } from 'accounting/settings';

export default {
  name: 'accounting.js',
  initialize: () => {
    currency.symbol = '€';
    currency.decimal = ',';
    currency.thousand = '.';
    currency.format = '%v %s';
  }
};
