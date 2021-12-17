
module.exports = {

  testMessage: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('testMessage', data) }

    const res = {
      source: data.source,
      date: new Date().toISOString(),
      message: data.message
    }
    db.gameCollection.insertOne(res, (err) => {
      if (err) throw err
      io.emit('testMessage', res)
    })
  }

}
