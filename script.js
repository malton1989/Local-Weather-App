$(document).ready(function(){ 
      $('#seek').click(function() {
      document.getElementById("test").innerHTML ="";
document.getElementById("city").innerHTML="";         
document.getElementById("info1").innerHTML="";
document.getElementById("info2").innerHTML="";        navigator.geolocation.getCurrentPosition(function(position) {
    		var lat = position.coords.latitude; 
    		var long = position.coords.longitude;
        var query = lat + "," + long; 
      	var myurl= "https://api.wunderground.com/api/b137b02900f8fd60/geolookup/conditions/q/";
  			myurl += query;
        myurl += ".json";
        console.log(myurl);  
      $.ajax({
      url : myurl, 
      dataType : "jsonp", 
      success : function(parsed_json) {
      	var location = parsed_json['location']['city'];
      	var temp_f = parsed_json['current_observation']['temp_f'];
      	var temp_c = parsed_json['current_observation']['temp_c'];
        $my_global_var = temp_c; 
        var current_weather = parsed_json['current_observation']['weather'];
        var curTemp= "The current temperature is: " + temp_f + "&deg;F";
        var curCond="and it's " + current_weather ; 
        $("#city").append(location); 
        //$("#test").append(msg);
        $("#info1").append(curTemp);
        $("#info2").append(curCond); 
        //$("#test").html(msg);
        if(current_weather == "Mostly Cloudy" || "Partly Cloudy" || "Partly Sunny"){
  					document.getElementById("mostlyCloudy").style.display ="block";
					}else if(current_weather == "Clear" || "Sunny"){
            document.getElementById("nice").style.display="block"; 
      		}else if(current_weather == "Snow" || "Chance of Flurries" || "Flurries" || "Chance of Snow" || "Sleet" || "Chance of Sleet"){
        		document.getElementById("frozen").style.display="block"; 
          }else if(current_weather =="Cloudy"){
            document.getElementById("cloudy").style.display="block"; 
          }else if(current_weather =="Chance of a Thunderstorm" || "Thunderstorm"){
            document.getElementById("storm").style.display="block"; 
          }else if(current_weather=="Chance of Rain" || "Rain"){
            document.getElementById("rain").style.display="block"; 
          }
      		}   
        }); 
      });  
    });
    //Convert to Celsius Button 
    $('#convert').click(function(){
      document.getElementById("info1").innerHTML="";
      $("#info1").html("The current temperature is: " + $my_global_var + "&deg;"+"C");
    });   
 });