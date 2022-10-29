/* eslint-disable no-await-in-loop */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.initializeUserOnCreate = functions.auth.user().onCreate(async (firebaseUser) => {
  const userId = firebaseUser.providerData[0].uid

  return admin.firestore().collection("users").doc(firebaseUser.uid).set({
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    photoUrl: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
    phoneNumber: firebaseUser.phoneNumber,
    providerId: firebaseUser.providerData[0].providerId,
    userId: userId || "",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { ignoreUndefinedProperties: true } );
});

exports.initializeUserOnDelete = functions.auth.user().onDelete(async (firebaseUser) => {
  const doc = admin.firestore().collection("users").doc(firebaseUser.uid);
  return doc.delete();
})
