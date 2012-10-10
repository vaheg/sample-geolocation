function id(element) {
	return document.getElementById(element);
}
 
function setResults(value) {
	if (!value) {
		id("results").innerHTML = "";
	} else {
		id("results").innerHTML = value;
	}
}           
            
document.addEventListener("deviceready", onDeviceReady, false);

var watchID = null;
 
function onDeviceReady() {
	id("watchButton").addEventListener("click", handleWatch, false);
	id("refreshButton").addEventListener("click", handleRefresh, false);
}
 
function handleRefresh() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
 
function handleWatch() {
	// If watch is running, clear it now. Otherwise, start it.
	var button = id("watchButton");
                 
	if (watchID != null) {
		setResults();
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
                     
		button.innerHTML = "Start Geolocation Watch";
	} else {
		setResults("Waiting for geolocation information...");
		// Update the watch every second.
		var options = {
			frequency: 1000,
			enableHighAccuracy: true
		};
		watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		button.innerHTML = "Clear Geolocation Watch";
        
	}
}
 
function onSuccess(position) {
	// Successfully retrieved the geolocation information. Display it all.
	setResults('Latitude: ' + position.coords.latitude + '<br />' +
			   'Longitude: ' + position.coords.longitude + '<br />' +
			   'Altitude: ' + position.coords.altitude + '<br />' +
			   'Accuracy: ' + position.coords.accuracy + '<br />' +
			   'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
			   'Heading: ' + position.coords.heading + '<br />' +
			   'Speed: ' + position.coords.speed + '<br />' +
			   'Timestamp: ' + new Date(position.timestamp) + '<br /><hr/>');
}
 
function onError(error) {
	setResults('code: ' + error.code + '<br/>' +
			   'message: ' + error.message + '<br/>');
}