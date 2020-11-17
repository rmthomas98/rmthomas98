(function() {

    let sun = document.getElementById("sun");
    let cloud = document.getElementById("cloud");
    let rain = document.getElementById("rain");
    let partlyCloudy = document.getElementById("partly-cloudy");
    let snow = document.getElementById("snow");
    let cloudyNight = document.getElementById("cloudy-night");
    let clearNight = document.getElementById("clearskies-night");
    let rainyNight = document.getElementById("rainy-night");
    let fog = document.getElementById("fog");
    let thunderstorm = document.getElementById("thunderstorm");
    let timeZone;

    activatePlacesSearch = () => {

        let input = document.getElementById("city-search");
        let options = {
            types: ['(cities)'],
            componentRestrictions: {country: "us"}
           };

        let autocomplete = new google.maps.places.Autocomplete(input, options);

    }

    getTime = () => {
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let amPm = "AM";
        let currentTime = (timeZone / 60) / 60;
        let displayTime = document.getElementById("time");

        if (minute < 10) {
            minute = "0" + minute;
        }

        if (currentTime == -6) {
            if (hour > 12) {
                hour -= 12;
                amPm = "PM";
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "CST";
        }

        if (currentTime == -7) {
            hour -= 1;
            if (hour > 12) {
                hour -= 12;
                amPm = "PM"
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "MST";
        }
        
        if (currentTime == -8) {
            hour -= 2;
            if (hour > 12) {
                hour -= 12;
                amPm = "PM"
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "PST";
        }

        if (currentTime == -9) {
            hour -= 3;
            if (hour > 12) {
                hour -= 12;
                amPm = "PM"
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "AKST";
        }

        if (currentTime == -10) {
            hour -= 4;
            if (hour > 12) {
                hour -= 12;
                amPm = "PM"
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "HST";
        }

        if (currentTime == -5) {
            hour += 1;
            if (hour > 12) {
                hour -= 12;
                amPm = "PM"
            }
            if (hour == 12) {
                amPm = "PM";
            }
            if (hour == 0) {
                hour = 12;
                amPm = "AM";
            }
            displayTime.innerHTML = hour + ":" + minute + " " + amPm + " " + "EST";
        }

        myArray = [hour, amPm, minute]
        return myArray;
        
    }   
    getTime();
    setInterval(getTime);

    search = () => {

        document.getElementById("submit").addEventListener("click", function() {
            let inputVal = document.getElementById("city-search").value;
            let city = inputVal.split(",")
            let stateCountry = city[1] + city[2];
            inputVal = city[0] + "," + stateCountry.trim().split(" ").join(",")
        
            let key = "224af8dc5b268179f8409b9a2aa099b2";
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + key).then(function  (response){response.json().then(function(data){
                console.log(data);
                drawWeather(data);
            });
        }).catch(function(error) {
            console.log("Fetch Error:", error);
        });
        })
    
        document.getElementById("city-search").addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                let inputVal = document.getElementById("city-search").value;
                let city = inputVal.split(",")
                let stateCountry = city[1] + city[2];
                inputVal = city[0] + "," + stateCountry.trim().split(" ").join(",")
                
            
                let key = "224af8dc5b268179f8409b9a2aa099b2";
                fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + key).then   (function(response){response.json().then(function(data){
                    console.log(data);
                    drawWeather(data);
                });
            }).catch(function(error) {
                console.log("Fetch Error:", error);
            });
            }
        })
    }
    search();

    drawWeather = (d) => {
        let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
        let mainCondition = d.weather[0].main;
        let description = d.weather[0].description;
        let high = Math.round(((parseFloat(d.main.temp_max)-273.15)*1.8)+32);
        let low = Math.round(((parseFloat(d.main.temp_min)-273.15)*1.8)+32); 
        timeZone = d.timezone;

        document.getElementById('condition').innerHTML = description;
        document.getElementById('degrees').innerHTML = fahrenheit + '&deg;';
        document.getElementById('city').innerHTML = d.name;
        document.getElementById("high-low").innerHTML = "H: " + high + "&deg;" + " L: " + low + "&deg";
        document.getElementById("high-low").style.display = "inline";

        if (mainCondition == "Clouds") {
            displayIcons(description);
        } else {
            displayIcons(mainCondition);
        };
    }

    displayIcons = (main) => {


        if (main == "Clear" && getTime()[0] < 6 && getTime()[1] == "PM" || main == "Clear" && getTime()[0] > 6 && getTime()[1] == "AM") {
            sun.style.display = "inline";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "Clear" && getTime()[0] >= 6 && getTime()[1] == "PM" || main == "Clear" && getTime()[0] <= 6 && getTime()[1] == "AM") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "inline";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "few clouds" && getTime()[0] < 6 && getTime()[1] == "PM" || main == "few clouds" && getTime()[0] > 6 && getTime()[1] == "AM" || main == "scattered clouds" && getTime()[0] <= 6 && getTime()[1] == "PM" || main == "scattered clouds" && getTime()[0] > 6 && getTime()[1] == "AM") {
            partlyCloudy.style.display = "inline";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "few clouds" && getTime()[0] >= 6 && getTime()[1] == "PM" || main == "few clouds" && getTime()[0] <= 6 && getTime()[1] == "AM" || main == "scattered clouds" && getTime()[0] > 6 && getTime()[1] == "PM" || main == "scattered clouds" && getTime()[0] <= 6 && getTime()[1] == "AM" || main == "broken clouds" && getTime()[0] >= 6 && getTime()[1] == "PM" || main == "broken clouds" && getTime()[0] <= 6 && getTime()[1] == "AM" || main == "overcast clouds" && getTime()[0] >= 6 && getTime()[1] == "PM" || main == "overcast clouds" && getTime()[0] <= 6 && getTime()[1] == "AM") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "inline";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "broken clouds" && getTime()[0] < 6 && getTime()[1] == "PM" || main == "broken clouds" && getTime()[0] > 6 && getTime()[1] == "AM" || main == "overcast clouds" && getTime()[0] < 6 && getTime()[1] == "PM" || main == "overcast clouds" && getTime()[0] > 6 && getTime()[1] == "AM") {
            sun.style.display = "none";
            cloud.style.display = "inline";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "Rain" && getTime()[0] < 6 && getTime()[1] == "PM" || main == "Rain" && getTime()[0] > 6 && getTime()[1] == "AM") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "inline";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "Rain" && getTime()[0] >= 6 && getTime()[1] == "PM" || main == "Rain" && getTime()[0] <= 6 && getTime()[1] == "AM" || main == "drizzle" && getTime()[0] >=6 && getTime()[1] == "PM" || main == "drizzle" && getTime()[0] < 6 && getTime()[1] == "AM") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "inline";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "Snow") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "inline";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }

        if (main == "Fog" || main == "Mist" || main == "Smoke" || main == "Haze" || main == "Dust" || main == "Sand" || main == "Ash" || main == "Squall" || main == "Tornado") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "inline";
            thunderstorm.style.display = "none";
        }

        if (main == "Drizzle") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "none";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "inline";
            fog.style.display = "none";
            thunderstorm.style.display = "none";
        }
        
        if (main == "Thunderstorm") {
            sun.style.display = "none";
            cloud.style.display = "none";
            rain.style.display = "inline";
            partlyCloudy.style.display = "none";
            snow.style.display = "none";
            cloudyNight.style.display = "none";
            clearNight.style.display = "none";
            rainyNight.style.display = "none";
            fog.style.display = "none";
            thunderstorm.style.display = "inline"
        }

    }

})();
