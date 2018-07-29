
const STORAGE_KEY = 'ycjf'

export default {
  fetch: function (key = null) {
    let wholeData = window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
    if (key !== null) {
      return wholeData[key]
    }
    return wholeData
  },
  save: function (items) {
    let wholeData = this.fetch()
    for (let val in items) {
      wholeData[val] = items[val]
    }
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(wholeData))
  },
  clear: function (key = null) {
    if (key != null) {
      let wholeData = this.fetch()
      delete wholeData[key]
      window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(wholeData))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }
}
