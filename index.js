let dp = require('despair')

let base = 'https://api.npoint.io/'

module.exports = NPoint

function NPoint (key) {
  this.key = 'Bearer ' + key
  this.Document = id => new Document(id)
}

function Document (id) {
  this.id = id
}

Document.prototype.get = async function (path = '', callback) {
  try {
    if (path[0] !== '/') path = '/' + path
    let body = await dp(this.id + path, { base }).json()
    if (!callback) return body
    callback(null, body)
  } catch (e) {
    if (!callback) return { error: e }
    callback(e, null)
  }
}

Document.prototype.put = async function (path = '', data, callback) {
  try {
    if (path) {
      let main = await this.get()
      setValue(main, path, data)
      data = main
    }
    let body = await dp.post(this.id, {
      base, headers: { Authorization: this.key }, type: 'json', data
    }).json()
    if (!callback) return body
    callback(null, body)
  } catch (e) {
    if (!callback) return { error: e }
    callback(e, null)
  }
}

Document.prototype.delete = async function (path = '', callback) {
  try {
    let data = {}
    if (path) {
      let main = await this.get()
      setValue(main, path, null, true)
      data = main
    }
    let body = await dp.post(this.id, {
      base, headers: { Authorization: this.key }, type: 'json', data
    }).json()
    if (!callback) return body
    callback(null, body)
  } catch (e) {
    if (!callback) return { error: e }
    callback(e, null)
  }
}

function setValue (obj, path, value, del) {
  if (!Array.isArray(path)) path = path.split('/').filter(x => x)
  while (path.length > 1) {
    let p = path.shift()
    if (obj[p] === undefined) obj[p] = {}
    obj = obj[p]
  }
  if (del) {
    if (Array.isArray(obj) && Number.isInteger(+path[0])) {
      obj.splice(+path[0], 1)
    } else {
      delete obj[path[0]]
    }
  } else {
    obj[path[0]] = value
  }
}
