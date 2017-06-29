import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers/index.js'
import VomApp from './components/index.jsx'

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <VomApp />
  </Provider>,
  document.getElementById('ReactApp')
)
