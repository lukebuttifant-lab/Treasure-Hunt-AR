// JavaScript Document
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported.');
}

navigator.geolocation.watchPosition(function(position) {
	var currentLatLongDiv = document.getElementById("currentLatLong");
  currentLatLongDiv.innerHTML = ("Lat: " + position.coords.latitude.toFixed(8)); 
  currentLatLongDiv.innerHTML += (" Long: " + position.coords.longitude.toFixed(8));
	showNearby(globalVariabe.level, position);
});


function showNearby(level, position){
	const arrowEntity = document.getElementById("arrowEntity");
	var distanceAway = calculateDistance(position.coords.latitude, position.coords.longitude, markers[level - 1].Lat, markers[level - 1].Long ) * 1000
	console.log("The clue is: " + (distanceAway) + " metres away");
	var bearing = calculateBearing(position.coords.latitude, position.coords.longitude, markers[level - 1].Lat, markers[level - 1].Long )
	arrowEntity.setAttribute("rotation",  '0 ' + bearing + ' 0')
		if(distanceAway <= 5){
			const speechbubble = document.getElementById("speechBubble");
	       speechbubble.innerHTML = markers[level - 1].dialogue;
			speechbubble.style.display = "block";
			arrowEntity.setAttribute('visible', false);
	   }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1* (Math.PI / 180)) * Math.cos(lat2* (Math.PI / 180)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return d;
}

function calculateBearing(lat1, lon1, lat2, lon2){
  lat1 = lat1 * Math.PI / 180;
  lon1 = lon1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;

  var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  var x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  var bearing = Math.atan2(y, x);
  bearing = bearing * 180 / Math.PI;
  return (bearing + 360) % 360;
}