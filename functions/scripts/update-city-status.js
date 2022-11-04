const axios = require('axios').default;

axios.post('http://127.0.0.1:5001/hackqc2022-8347e/us-central1/updateTerminalsStatusInGivenCity', {city: 'Québec', status: 'available', notificationVisibility: false})