const request = require('request-promise-native');

const fetchMyIP = () => {
  
  return request('https://api.ipify.org/?format=json')
  .then((body) => { const ip = JSON.parse(body).ip
    return ip
  })
}

/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (ip) => {
   
 return request(`https://ipvigilante.com/json/${ip}`)
 .then((body) => { 
   const data = JSON.parse(body)
   const lat = data.data.latitude
   const long = data.data.longitude
   return {lat, long}
})
}
/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = ({lat, long}) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`;
  return request(url);
 
};


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(body => JSON.parse(body).response)

}
module.exports = { nextISSTimesForMyLocation };