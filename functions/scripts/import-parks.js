const axios = require("axios").default;
const fs = require("fs");

stationsJson = JSON.parse(
  fs.readFileSync(
    "../../data/dataset/circuit-electrique/liste-complete-des-bornes-accents.json",
    "utf8"
  )
);

// let stationsJson = {}
let parksJson = {};

stationsJson.forEach((station) => {
  station["availability"] = {
    monday: {
      end: "23:59",
      start: "00:00",
    },
    tuesday: {
      end: "23:59",
      start: "00:00",
    },
    wednesday: {
      end: "23:59",
      start: "00:00",
    },
    thursday: {
      end: "23:59",
      start: "00:00",
    },
    friday: {
      end: "23:59",
      start: "00:00",
    },
    saturday: {
      end: "23:59",
      start: "00:00",
    },
    sunday: {
      end: "23:59",
      start: "00:00",
    },
  };
});

// fill parksJson
stationsJson.forEach((station) => {
  parksJson[station["parkName"]] = {
    adresse: station["address"],
    city: station["city"],
    latitude: station["latitude"],
    longitude: station["longitude"],
    owner: station["owner"],
    parkName: station["parkName"],
    region: station["region"],
    terminals: [],
    street: station["street"],
    type: station["type"],
    visible: true,
    zipCode: station["zipCode"],
  };
});

// add stations to park
stationsJson.forEach((station) => {
  parksJson[station["parkName"]]["terminals"].push(station);
});

parksList = [];
for (var key in parksJson) {
  parksList.push(parksJson[key]);
}

// send parksList to firebase
axios.post("http://127.0.0.1:5001/hackqc2022-8347e/us-central1/importParks", {
  parks: parksList,
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
