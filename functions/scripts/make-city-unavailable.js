const axios = require('axios').default;

axios.post('https://us-central1-hackqc2022-8347e.cloudfunctions.net/makeParksUnavailableInCity', {city: 'Granby'})