// const axios = require('axios').default;
// const fs = require("fs");


// csv_events = fs.readFileSync("../../data/dataset/circuit-electrique/liste-complete-des-bornes-accents.csv")
// const array = csv_events.toString().split("\r");
// const header = array[0].split(",");

// function importAsync(station) {
//   return new Promise(function(resolve){
//     return axios.post('http://localhost:5001/hackqc2022-8347e/us-central1/importCircuitElectriqueStations', station);
//   })
// }

// for (let i = 1; i < 3; i++) {
//   const str = array[i];
//   const values = str.split(",");
//   const obj = {};
//   obj['stationName'] = values[0].replace('\n', '');
//   for (let j = 1; j < header.length; j++) {
//     obj[header[j]] = values[j];
//   }
//   console.log(obj)
//   importAsync(obj)
//   .then(function (response) {
//     console.log(response.data);
//   });
// }