let temp = document.getElementById('temp');
let loc = document.getElementById('location');
let hum = document.getElementById('humidity');
let wind = document.getElementById('wind');
let img = document.getElementById('img-icon');
let userLoc = document.getElementById('user-loc');

// Fetches the users location
window.onload = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(coords);
    } else{
        alert('Whoops! It seems like your browser does not support Geolocation 😢');
    }

    function coords(position){
        // Gets the users latitude and longitude coordinates
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        // Sends a HTTP request to wunderground.com in order to get the data needed
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://api.wunderground.com/api/2ed0be37ae79c777/conditions/q/${lat},${lon}.json`, true);
        xhr.onload = function(){
            if(this.status == 200){
                let prs = JSON.parse(xhr.responseText);

                // Adding in the information recieved from wunderground.com into the html for the user to see
                temp.innerHTML = prs.current_observation.temp_c + '&deg;C';
                loc.innerHTML = '<p id="userloc">Your Current Location is: </p>'+ prs.current_observation.display_location.full;
                wind.innerHTML = '<i class="wi wi-strong-wind"></i> ' + prs.current_observation.wind_mph + 'mph';
                hum.innerHTML = '<i class="wi wi-humidity"></i> ' + prs.current_observation.relative_humidity;
                img.src = prs.current_observation.icon_url;

            }else{
                alert('Uh oh! There seems to have been an error loading the weather for your location.');
            }
        }
        xhr.send();
    }
}  

// Checks whether or not the user is connected to the internet
if(navigator.onLine){
    console.log('Connected to the internet :)');
}

window.addEventListener('offline', off);
window.addEventListener('online', on);

function off(){
    document.getElementById('temp-loc').style.display = 'none';
    document.getElementById('col').style.display = 'none';
    document.getElementById('offlineMsg').style.display = 'block';
}

function on(){
    document.getElementById('temp-loc').style.display = 'block';
    document.getElementById('col').style.display = 'block';
    document.getElementById('offlineMsg').style.display = 'none';
}
