/* eslint-disable no-await-in-loop */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

exports.initializeUserOnCreate = functions.auth
  .user()
  .onCreate(async (firebaseUser) => {
    const userId = firebaseUser.providerData[0].uid;

    return admin
      .firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .set(
        {
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          phoneNumber: firebaseUser.phoneNumber,
          providerId: firebaseUser.providerData[0].providerId,
          userId: userId || "",
          credits: 10,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { ignoreUndefinedProperties: true }
      );
  });

exports.initializeUserOnDelete = functions.auth
  .user()
  .onDelete(async (firebaseUser) => {
    const doc = admin.firestore().collection("users").doc(firebaseUser.uid);
    return doc.delete();
  });

// add cultural event to firebase
exports.importCulturalEventsFromDataset = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      admin.firestore().collection("culturalEvents").add({
        city: request.body.city,
        date: request.body.date,
        name: request.body.name,
      });
      response.status(200).send("OK");
    });
  }
);

// add stations
exports.importCircuitElectriqueStations = functions.https.onRequest(
  (request, response) => {
    // console.log(request.body);
    cors(request, response, async () => {
      try {
        await admin.firestore().collection("stations").add(request.body);
        response.status(200).send("OK");
      } catch (error) {
        console.log(error);
      }
    });
  }
);

// add parks
exports.importParks = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    admin.firestore().collection("parks").add(request.body);
    response.status(200).send("OK");
  });
});

// make all terminals of all parks unavailable in a given city
exports.makeParksUnavailableInCity = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const city = request.body.city;
      console.log(city);
      const parks = await admin
        .firestore()
        .collection("parks")
        .where("city", "==", city)
        .where("type", "==", "public")
        .get();

      parks.forEach(async (park) => {
        const terminals = park.data().terminals;
        console.log(terminals);

        let updatedTerminals = [];

        terminals.forEach(async (terminal) => {
          updatedTerminals.push({
            ...terminal,
            status: "unavailable",
          });
        });
        console.log(updatedTerminals);

        await admin.firestore().collection("parks").doc(park.id).update({
          terminals: updatedTerminals,
        });
      });
      response.status(200).send("OK");
    });
  }
);

exports.addReservation = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;

  await admin
    .firestore()
    .collection("transactions")
    .add({
      userId,
      ...data,
    });

  const park = await admin
    .firestore()
    .collection("parks")
    .doc(data.parkId)
    .get();

  const terminals = park.data().terminals;

  let updatedTerminals = [];

  terminals.forEach(async (terminal) => {
    updatedTerminals.push({
      ...terminal,
      status:
        terminal.stationName === data.terminalId ? "reserved" : terminal.status,
    });
  });

  await admin.firestore().collection("parks").doc(data.parkId).update({
    terminals: updatedTerminals,
  });

  const increment = admin.firestore.FieldValue.increment(-1);

  await admin.firestore().collection("users").doc(userId).update({
    credits: increment,
  });

  return;
});

exports.cancelReservation = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;

  await admin.firestore().collection("transactions").doc(data.id).delete();

  const park = await admin
    .firestore()
    .collection("parks")
    .doc(data.parkId)
    .get();

  const terminals = park.data().terminals;

  let updatedTerminals = [];

  terminals.forEach(async (terminal) => {
    updatedTerminals.push({
      ...terminal,
      status: "available",
    });
  });

  await admin.firestore().collection("parks").doc(data.parkId).update({
    terminals: updatedTerminals,
  });

  const increment = admin.firestore.FieldValue.increment(1);

  await admin.firestore().collection("users").doc(userId).update({
    credits: increment,
  });
  // Send push notification to owner
  // Remove user credit
  return;
});
