import BaseDatePicker from 'bs-client/mixins/base-date-picker';
import DatePickerComponent from 'ember-cli-bootstrap-datepicker/components/bootstrap-datepicker';

export default DatePickerComponent.extend(BaseDatePicker, {
  classNames: ['form-control', 'calendar-input', 'int-calendar-date'],
  attributeBindings: ['isReadOnly:readonly']
});
