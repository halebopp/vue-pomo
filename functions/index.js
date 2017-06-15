const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

admin.initializeApp(functions.config().firebase)
const today = moment().format('YYYY-MM-DD')

exports.updatePomodori = functions.database.ref('/tasks/{userId}/{taskId}')
  .onWrite((event) => {
    if (!event.data.previous.val()) {
      return
    }
    /* eslint-disable */
    const originalPomodori = event.data.previous.child('pomodori').val()
    const currentPomodori = event.data.child('pomodori').val()
    if (currentPomodori > originalPomodori) {
      console.log('A pomodoro has been added')
      console.log('Querying to see if a dailypoms entry exists for today...')
      admin.database().ref(`dailypoms/${event.params.userId}`).orderByChild('date').equalTo(today).limitToFirst(1).once('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log('It does! Adding a pomodoro.')
          let theKey
          snapshot.forEach((childSnapshot) => {
            theKey = childSnapshot.key
          })
          const newDailyPoms = snapshot.child(`${theKey}/pomodori`).val() + 1
          return admin.database().ref(`dailypoms/${event.params.userId}/${theKey}`).update({ pomodori: newDailyPoms })
        } else {
          console.log('it doesn\'t exist')
          admin.database().ref(`dailypoms/${event.params.userId}`).push({ date: today, pomodori: 1 })
          return
        }
      })
    } else {
      console.log('No pomodoro added by user — nothing to do here.')
      return
    }
})
