import firebase, { cloudformCollection } from "@/config/firebase";
import { CloudformData } from "@/interface/cloudformData.interface";

export const getCloudForm = (): firebase.firestore.DocumentData => {
  return cloudformCollection
    .doc("MinhNguyen")
    .get()
    .then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        return undefined;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};

export const setCloudForm = (cloudformData: CloudformData) => {
  cloudformCollection.doc("MinhNguyen").set(cloudformData);
};

export const checkSyncProgress = () => {
  firebase.functions().httpsCallable("checkSyncProgress");
};
