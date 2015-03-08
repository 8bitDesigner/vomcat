var React = require('react')
  , Calendar = require('../calendar')
  , moment = require('moment')

export default class VomMonth extends Calendar {
  get voms()       { return this.props.voms.map(v => moment(v)) }

  classNamesFor(date) {
    var classes = super.classNamesFor(date)
    if (this.voms.some(v => v.isSame(date, 'day'))) { classes.push('day-vom') }
    return classes
  }
}

