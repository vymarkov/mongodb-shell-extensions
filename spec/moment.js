assert.that('moment.$in creates query for ranges of time', function(c) {
  var aMinuteAgo = (1).minute().ago().toDate()
  var aDayAgo = (1).day().ago().toDate()

  c.save({'created_at': aMinuteAgo})
  c.save({'created_at': aDayAgo})

  var createdInLast3Minutes = c.find({'created_at': moment.$in(moment.last(3).minutes())})

  assert.eq(createdInLast3Minutes.count(), 1)
})

assert.that('moment.$in requires a date range', function(c) {
  assert.throws(function() {
    moment.$in(null)
  }, [], 'null should not be accepted as date range')
  assert.throws(function() {
    moment.$in({})
  }, [], 'and empty object should not be accepted as date range')
  assert.throws(function() {
    moment.$in(moment())
  }, [], 'a Moment should not be accepted as date range')
  assert.doesNotThrow(function() {
    moment.$in(moment().range())
  }, [], 'a DateRange should be accepted as date range')
})
