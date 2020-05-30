// Adding API url

const url = "https://api.spacexdata.com/v2/launchpads";

var spaceXResults = d3.json(url).then(receivedData => console.log(receivedData));


// Locating Vandenberg AFB [0] index within .json
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

// Locating VAFB latitude
d3.json(url).then(spaceXResults =>
    console.log(spaceXResults[0].location.latitude));

// Locating longs and lats of all bases via .map 
//var long_lat = d3.json(url).map(location ==>);
