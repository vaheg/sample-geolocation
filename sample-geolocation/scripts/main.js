function id(element) {
	return document.getElementById(element);
}
 
         
            
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    geolocationApp=new geolocationApp();
    geolocationApp.run();
    
}
 


function geolocationApp(){}

geolocationApp.prototype={
    _watchID:null,
    
    run:function(){
        var that=this;
        document.getElementById("watchButton").addEventListener("click", that._handleWatch, false);
	    document.getElementById("refreshButton").addEventListener("click", that._handleRefresh, false);
    },
    
    _handleRefresh:function() {
        var options = {
    			enableHighAccuracy: true
    		};
    	navigator.geolocation.getCurrentPosition(geolocationApp._onSuccess, geolocationApp._onError,options);
    },
    
    _handleWatch:function() {
    	// If watch is running, clear it now. Otherwise, start it.
    	var button = document.getElementById("watchButton");
                     
        if (geolocationApp._watchID != null) {
    		geolocationApp._setResults();
    		navigator.geolocation.clearWatch(geolocationApp._watchID);
    		geolocationApp._watchID = null;
                         
    		button.innerHTML = "Start Geolocation Watch";
    	} else {
    		geolocationApp._setResults("Waiting for geolocation information...");
    		// Update the watch every second.
    		var options = {
    			frequency: 1000,
    			enableHighAccuracy: true
    		};
    		geolocationApp._watchID = navigator.geolocation.watchPosition(geolocationApp._onSuccess, geolocationApp._onError, options);
    		button.innerHTML = "Clear Geolocation Watch";
            
    	}
    },
    
    _onSuccess:function(position) {
    	// Successfully retrieved the geolocation information. Display it all.
        
    	geolocationApp._setResults('Latitude: ' + position.coords.latitude + '<br />' +
    			   'Longitude: ' + position.coords.longitude + '<br />' +
    			   'Altitude: ' + position.coords.altitude + '<br />' +
    			   'Accuracy: ' + position.coords.accuracy + '<br />' +
    			   'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    			   'Heading: ' + position.coords.heading + '<br />' +
    			   'Speed: ' + position.coords.speed + '<br />' +
    			   'Timestamp: ' + new Date(position.timestamp) + '<br /><hr/>');
    },
    
    _onError:function(error) {
    	geolocationApp._setResults('code: ' + error.code + '<br/>' +
    			   'message: ' + error.message + '<br/>');
    },
    
    _setResults:function(value) {
    	if (!value) {
    		document.getElementById("results").innerHTML = "";
    	} else {
    		document.getElementById("results").innerHTML = value;
    	}
    },
}