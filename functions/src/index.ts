const functions = require("firebase-functions");
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.checkSyncProgress = functions.firestore
  .document("cloud-form/MinhNguyen")
  .onUpdate(async (change: any) => {
    // Retrieve the current and previous value
    let data = change.after.data();
    let previousData = change.before.data();
    // Remove percentage property
    delete data.percentage;
    delete previousData.percentage;

    let count = 0;
    if (JSON.stringify(data) === JSON.stringify(previousData)) {
      return null;
    }
    for (const value of Object.values(data)) {
      if (value) count++;
    }
    console.log("sync percentage", count / 5);
    return db.doc("cloud-form/MinhNguyen").set(
      {
        percentage: count / 5,
      },
      { merge: true }
    );
  });
