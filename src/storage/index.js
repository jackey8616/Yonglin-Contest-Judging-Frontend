
const STORAGE_KEY = 'ycvf-chache'

export default {
  fetch: function (key = null) {
    let wholeData = window.localStorage.getItem(STORAGE_KEY)
    if (key != null) {
      return window.JSON.parse(wholeData || '{}')[key]
    } else {
      return window.JSON.parse(wholeData || '{}')
    }
  },
  save: function (items) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))
  },
  clear: function (key = null) {
    if (key != null) {
      let wholeData = this.fetch()
      delete wholeData[key]
      this.save(wholeData)
    } else {
      window.localStorage.clear()
    }
  }
}
