const axios = require("axios").default;

// Avant Démo
// Reset ville de québec
// Supprimer tout les bornes privées

// Shutdown + notif
axios.post(
  "https://us-central1-hackqc2022-8347e.cloudfunctions.net/updateTerminalsStatusInGivenCity",
  { city: "Québec", status: "unavailable", notificationVisibility: true }
);

// Reset
// axios.post(
//     "https://us-central1-hackqc2022-8347e.cloudfunctions.net/updateTerminalsStatusInGivenCity",
//     { city: "Québec", status: "available", notificationVisibility: false }
//   );
