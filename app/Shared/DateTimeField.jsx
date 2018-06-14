import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import DateTime from 'react-datetime'

import '../styles/pages/react-datetime.scss'

const DateTimeField = ({ name, disabled, input, label, placeholder, ...props}) => {


  return (
    <DateTime
      name={name}
      locale='en'
      dateFormat={false}
      timeFormat='hh:mm'
      onChange={date => input.onChange(moment(date).format('hh:mm A'))}
      disabled={disabled}
    />
    )
};


export default DateTimeField