const request = require('request');

const fetchMyIP = ((callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
});

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if(error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
      return;
    }
    const lat = JSON.parse(body).data.latitude;
    const long = JSON.parse(body).data.longitude;
    // console.log("JSON.parse(body).data ", JSON.parse(body).data)
    const data = {
      latitude: lat,
      longitude: long,
    };
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };