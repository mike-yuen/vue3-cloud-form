const functions = require("firebase-functions");
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

exports.checkSyncProgress = functions.firestore
  .document("cloud-form/MinhNguyen")
  .onUpdate(() => {
    console.log("______________ checkSyncProgress");
  });
