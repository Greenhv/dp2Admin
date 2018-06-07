import DateTimePicker from 'react-widgets';
import moment from 'moment';
import momentLocalis from 'react-widgets'

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />

export default renderDateTimePicker;