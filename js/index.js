var weather;

var digits = $("#digits");
var city = $("#city");
var icon = $("#icon");
var units = $("#units");
var weather = $("#weather");
var errorCssProp = {"-webkit-transition-property": "opacity",
                       "-o-transition-property": "opacity",
                       "transition-property": "opacity",
                       "-webkit-transition-duration": "3s",
                       "-o-transition-duration": "3s",
                       "transition-duration": "3s",
                       "opacity": "1",
                       "font-size": "x-large",                                                                                                              "font-weight": "bold"};
var successCssProp = {"-webkit-transition-property": "opacity",
                       "-o-transition-property": "opacity",
                       "transition-property": "opacity",
                       "-webkit-transition-duration": "3s",
                       "-o-transition-duration": "3s",
                       "transition-duration": "3s",
                       "opacity": "1"};
var celsius = true;
var tempC, tempF;

getLocation();
units.click(cFtoggle);
/*get user location*/
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getWeather(position.coords.latitude, position.coords.longitude);
      }, showError);
    } else {
        printError(weather, "Geolocation is not supported by this browser");
    }
  
  /*error handler for navigator.geolocation.getCurrentPosition*/
  function showError(error) {
    var text = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            text = "You denied the request for Geolocation";
            break;
        case error.POSITION_UNAVAILABLE:
            text = "Location information is unavailable";
            break;
        case error.TIMEOUT:
            text = "The request to get location timed out. Please try again";
            break;
        case error.UNKNOWN_ERROR:
            text = "An unknown error occurred";
            break;
    }
    printError(weather, text);
  }
}
/*end getLocation*/

/*get weather from https:fcc-weather-api.glitch.me, return object from responce*/
function getWeather (lat, long) {
  var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long; 
  $.ajax({
    dataType: "json",
    url: url,
    success: success,
    error: function(jqXHR, textStatus, errorThrown) {
      printError(weather, "Server error occuped. Please try later");
    }
  });//end ajax
}

/*do smth after load weather from server*/
function success (data) {
  if (data.weather[0].icon && /^https.+/.test(data.weather[0].icon)) {
    icon.attr({"src": data.weather[0].icon,
             "alt": data.weather[0].description});
  }
  digits.text(data.main.temp);
  city.text(data.name + ", " + data.sys.country);
  weather.css(successCssProp);
  city.css(successCssProp);
  tempC = data.main.temp;
  tempF = data.main.temp*9/5 + 32;
}

/*print error with text "text" in DOM-element "element", adds some style*/
function printError (elem, text) {
  elem.text(text).addClass("text-danger").css(errorCssProp);
}

function cFtoggle () {
  if(celsius) {
    digits.text(tempF);
    units.text("F");
    celsius = false;
  } else {
    digits.text(tempC);
    units.text("C");
    celsius = true;
  }
}