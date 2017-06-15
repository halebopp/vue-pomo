import firebase from 'firebase'

// Initialize Firebase
// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
  apiKey: 'apiKey',
  authDomain: 'projectId.firebaseapp.com',
  databaseURL: 'https://databaseName.firebaseio.com',
  projectId: 'projectId',
  storageBucket: 'projectId.appspot.com',
  messagingSenderId: 'messagingSenderId'
}

const fbApp = firebase.initializeApp(config)

export default fbApp
