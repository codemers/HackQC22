const axios = require('axios').default;
const fs = require("fs");


csv_events = fs.readFileSync("../../data/dataset/circuit-electrique/liste-complete-des-bornes-accents.csv")
const array = csv_events.toString().split("\r");
const header = array[0].split(",");


let stationsJson = {}
let parksJson = {}
for (let i = 1; i < array.length-1; i++) {
  const str = array[i];
  const values = str.split(",");
  const obj = {};
  obj['stationName'] = values[0].replace('\n', '');
  for (let j = 1; j < header.length; j++) {
    obj[header[j]] = values[j];
    obj['availability'] = {
        monday: {
            end: "23:59",
            start: "00:00"
        },
        tuesday: {
            end: "23:59",
            start: "00:00"
        },
        wednesday: {
            end: "23:59",
            start: "00:00"
        },
        thursday: {
            end: "23:59",
            start: "00:00"
        },
        friday: {
            end: "23:59",
            start: "00:00"
        },
        saturday: {
            end: "23:59",
            start: "00:00"
        },
        sunday: {
            end: "23:59",
            start: "00:00"
        }
    };
  }
    stationsJson[obj['stationName']] = obj;
    parksJson[obj['parkName']] = {
        adresse: obj['address'],
        latitute: obj['latitude'],
        longitude: obj['longitude'],
        owner: obj['owner'],
        region: obj['region'],
        terminals: [],
        street: obj['street'],
        type: obj['type'],
        zipCode: obj['zipCode'],
    };
}

// add list of stations to park
for (var key in stationsJson) {
    if (stationsJson.hasOwnProperty(key)) {
        parksJson[stationsJson[key]['parkName']]['terminals'].push(stationsJson[key]);
    }
}

for(var key in parksJson) {
    axios.post('https://us-central1-hackqc2022-8347e.cloudfunctions.net/importParks', parksJson[key])
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
};