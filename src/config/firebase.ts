import * as firebase from "firebase";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  projectId: "vue3-cloud-form"
};
firebase.initializeApp(config);

export default firebase;
export const cloudformCollection = firebase
  .firestore()
  .collection("cloud-form");
