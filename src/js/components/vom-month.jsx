import React from 'react'

const moment = require('moment')

export default class VomMonth extends React.Component {
  constructor (props, rest) {
    super(props, rest)
    this.state = {month: moment()}
  }

  get voms () {
    return this.props.voms.map(v => moment(v))
  }

  get month () {
    return this.state.month
  }

  set month (newVal) {
    this.setState({ month: newVal })
  }

  classNamesFor (date) {
    var classes = ['day', `day-${date.day()}`]

    if (date.isSame(new Date(), 'day')) {
      classes.push('today')
    }

    if (date.date() === 1) {
      classes.push('day-first')
    } else if (date.date() === date.daysInMonth()) {
      classes.push('day-last')
    }

    if (this.voms.some(v => v.isSame(date, 'day'))) {
      classes.push('day-vom')
    }

    return classes
  }

  render () {
    const daysInMonth = this.month.daysInMonth()
    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
      var day = this.month.date(i)
      days.push(<li className={this.classNamesFor(day).join(' ')} key={i}>{day.format('D')}</li>)
    }

    return (
      <div>
        <h1 className='h3'>{this.month.format('MMMM')}</h1>
        <ul className='calendar list-unstyled'>{days}</ul>
      </div>
    )
  }
}

