/* eslint-disable no-await-in-loop */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });
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

// add cultural event to firebase
exports.importCulturalEventsFromDataset = functions.https.onRequest((request, response) => {
  cors(request, response,  async () => {
    admin.firestore().collection("culturalEvents").add({
      city: request.body.city,
      date: request.body.date,
      name: request.body.name,
    });
    response.status(200).send("OK");
  });
});

// add stations 
exports.importCircuitElectriqueStations = functions.https.onRequest(  (request, response) => {
  console.log(request.body);
  cors(request, response,  async () => {
    try {
      await admin.firestore().collection("stations").add(
        request.body
      );
      response.status(200).send("OK");
    }
    catch (error) {
      console.log(error);
  }});
});


// add parks
exports.importParks = functions.https.onRequest((request, response) => {
  cors(request, response,  async () => {
    admin.firestore().collection("parks").add(
      request.body
    );
    response.status(200).send("OK");
  });
});





// get all stations
// exports.getStations = functions.https.onRequest((request, response) => {
//   cors(request, response,  async () => {
//     const stations = await admin.firestore().collection("stations").get();
//     const stationsArray = stations.docs.map((doc) => doc.data());
//     console.log(stationsArray.length);
//     response.status(200).send(stationsArray);
//   });
// });