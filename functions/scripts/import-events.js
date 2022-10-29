const axios = require('axios').default;
const fs = require("fs");


csv_events = fs.readFileSync("evenements-all.csv")
var array = csv_events.toString().split("\r");

for (let i = 1; i < array.length -1 ; i++) {
  let str = array[i]
  values = str.split(",")
  let obj = {
    name: values[0],
    date: values[1],
    city: values[2],
  }

  axios.post('http://localhost:5001/hackqc2022-8347e/us-central1/importCulturalEventsFromDataset', obj)
    .then(function (response) {
      console.log('-------------------------------------')
      console.log(response);
      console.log('-------------------------------------')
    })
    .catch(function (error) {
      console.log('-------------------------------------')
      console.log(error);
      console.log('-------------------------------------')
    });
}

