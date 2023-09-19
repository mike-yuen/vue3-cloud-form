import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VUE_APP_FIREBASE_API_KEY,
  projectId: 'vue3-cloud-form'
}
const app = firebase.initializeApp(config)

export const firestore = getFirestore(app)
// collection('cloud-form')
