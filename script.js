const API_KEY = "API_KEY";
let isDisplaying = false;
let tempModes;
let unit = "F";

const input = document.querySelector("#citySearch");
const degrees = document.querySelector("#degrees");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const humidity = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");
const sunrise = document.querySelector("#sunrise");

async function getWeather(city) {
    try {
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
            + city
            + "?key="
            + API_KEY
        );
        const weatherData = await response.json();
        console.log(weatherData);
        
        const tempF = weatherData.days[0].temp.toFixed(1);
        const tempC = ((tempF - 32) * 5 / 9).toFixed(1);
        const conditions = weatherData.currentConditions.conditions;
        const humidity = weatherData.currentConditions.humidity;
        const visibility = weatherData.currentConditions.visibility;
        const sunrise = weatherData.currentConditions.sunrise;

        return {
            tempF,
            tempC,
            conditions,
            humidity,
            visibility,
            sunrise
        };

    } catch(error) {
        console.log(error);
    }
}

async function displayBroadcast(isDisplaying, broadcast) {
    if (isDisplaying){
        if(unit === "F")
            temp.textContent = broadcast.tempF + "\u00B0" + " F";
        else
            temp.textContent = broadcast.tempC + "\u00B0" + " C";
        conditions.textContent = broadcast.conditions;
        humidity.textContent = broadcast.humidity;
        visibility.textContent = broadcast.visibility;
        sunrise.textContent = broadcast.sunrise;
    } else {
        temp.textContent = "-";
        conditions.textContent = "-";
        humidity.textContent = "-";
        visibility.textContent = "-";
        sunrise.textContent = "-";
    }
}

async function isValidInput(city) {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        + city
        + "?key="
        + API_KEY
    );

    return response.ok;
}

function toggleTemp() {
    if(!isDisplaying)
        return;

    if(unit === "F") {
        temp.textContent = tempModes.celsius + "\u00B0" + " F";
        unit = "C";
    } else {
        temp.textContent = tempModes.fahrenheit + "\u00B0" + " C";
        unit = "F";
    }

    degrees.textContent = unit;
}

input.addEventListener("keydown", async(event) => {
    if (event.key === "Enter") {
        const city = input.value;

        if (await isValidInput(city)) {
            const weather = await getWeather(city);

            tempModes = {
                fahrenheit: weather.tempF,
                celsius: weather.tempC
            };
            isDisplaying = true;

            displayBroadcast(isDisplaying, weather);
        } else {
            isDisplaying = false;

            displayBroadcast(isDisplaying);
        }
    };
});

degrees.addEventListener("click", toggleTemp);