import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBHIMN3_xEotk__j2StJqwJ1BMxpMLV65s',
  authDomain: 'redeemer-e265b.firebaseapp.com',
  projectId: 'redeemer-e265b',
  storageBucket: 'redeemer-e265b.appspot.com',
  messagingSenderId: '83861672984',
  appId: '1:83861672984:web:3d20aea9d764775f179f6d',
  measurementId: 'G-TWZ713T2Z1',
}
// Create a reference under which you want to list
const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

export { storage }
