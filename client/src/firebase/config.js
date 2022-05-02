import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBA0LyxNaia5kKRJeyygR8DM82eR5uD-p0',
  authDomain: 'affiliate-app-b4e13.firebaseapp.com',
  projectId: 'affiliate-app-b4e13',
  storageBucket: 'affiliate-app-b4e13.appspot.com',
  messagingSenderId: '1095066547860',
  appId: '1:1095066547860:web:c3ac817274b2f231996681',
  measurementId: 'G-BM4H172RN6',
}
// Create a reference under which you want to list
const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

export { storage }

export const auth = getAuth(firebaseApp)
