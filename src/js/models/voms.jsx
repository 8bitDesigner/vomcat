export default class Voms {
  constructor (endpoint) {
    this.endpoint = endpoint
  }

  get (callback) {
    return window.fetch(this.endpoint, {
      method: 'GET',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(json => callback(null, json))
    .catch(err => callback(err))
  }

  create (callback) {
    return window.fetch(this.endpoint, {
      method: 'POST',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(json => callback(null, json))
    .catch(err => callback(err))
  }
}
