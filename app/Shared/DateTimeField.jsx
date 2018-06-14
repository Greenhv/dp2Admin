import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import DateTime from 'react-datetime'

import '../styles/pages/react-datetime.scss'

const DateTimeField = ({ name, disabled, input, label, placeholder, ...props }) => {


  return (
    <DateTime
      name={name}
      inputProps={{
        required: true
      }}
      locale='en'
      dateFormat={false}
      timeFormat='HH:mm'
      onChange={date => input.onChange(moment(date).format('HH:mm'))}
      disabled={disabled}
    />
  )
};


export default DateTimeField