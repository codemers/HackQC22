const axios = require('axios').default;
const fs = require("fs");




stationsJson = JSON.parse(fs.readFileSync("../../data/dataset/circuit-electrique/liste-complete-des-bornes-accents.json", "utf8"));
// const array = csv_events.toString().split("\r");
// const header = array[0].split(",");


// let stationsJson = {}
let parksJson = {}

stationsJson.forEach(station => {
    station['availability'] = {
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
    }
})

// log the first 5 elements of the array
console.log(stationsJson.slice(0, 5));

// add list of stations to park
stationsJson.forEach(station => {
    parksJson[station['parkName']] = {
        adresse: station['address'],
        latitude: station['latitude'],
        longitude: station['longitude'],
        owner: station['owner'],
        parkName: station['parkName'],
        region: station['region'],
        terminals: [],
        street: station['street'],
        type: station['type'],
        zipCode: station['zipCode'],
    };
})

// add stations to park
stationsJson.forEach(station => {
    parksJson[station['parkName']]['terminals'].push(station);
})

// log the first 5 elements of the array
console.log(parksJson);

for(var key in parksJson) {
    axios.post('https://us-central1-hackqc2022-8347e.cloudfunctions.net/importParks', parksJson[key])
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
};