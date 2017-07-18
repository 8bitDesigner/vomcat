import React from 'react'

export default class VomCreate extends React.Component {
  render () {
    return (
      <button
        disabled={this.props.disabled}
        className='btn btn-lg btn-primary btn-block'
        onClick={this.props.onCreate}
      >'Did cat vom?'</button>
    )
  }
}

