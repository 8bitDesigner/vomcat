var React = require('../../../node_modules/react/dist/react.min.js')
  , moment = require('../../../node_modules/moment/min/moment.min.js')

module.exports = class Calendar extends React.Component {
  constructor(props, rest) {
    super(props, rest)
    this.state = {month: props.month}
  }

  get month()       { return this.state.month }
  set month(newVal) { this.setState({month: newVal }) }

  classNamesFor(date) {
    var classes = ['day', `day-${date.day()}`]

    if (date.isSame(new Date(), 'day')) {
      classes.push('today')
    }

    if (date.date() === 1) {
      classes.push('day-first')
    } else if (date.date() === date.daysInMonth()) {
      classes.push('day-last')
    }

    return classes
  }

  render() {
    var daysInMonth = this.month.daysInMonth()
      , days = []

    for (var i = 1; i <= daysInMonth; i++) {
      var day = this.month.date(i)
      days.push(<li className={this.classNamesFor(day).join(' ')} key={i}>{day.format('D')}</li>)
    }

    return (
      <div>
        <h1 className="h3">{this.month.format('MMMM')}</h1>
        <ul className="calendar list-unstyled">{days}</ul>
      </div>
    )
  }
}
