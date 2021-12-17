
const Params = {

  isParam: function(param) {
    const search = location.search.replace('?', '').split('&')
    let found = false
    for (let i = 0; i < search.length; i++) {
      if (search[i] == param) {
        found = true
      }
    }
    return found
  },

  getParam: function(param) {
    const search = location.search.replace('?', '').split('&')
    let found = ''
    for (let i = 0; i < search.length; i++) {
      const p = search[i].match(/(.*)=(.*)/)
      if (p && p[1] == param) {
        found = p[2]
      }
    }
    return decodeURIComponent(found)
  }
}

export default Params
