const API_KEY = "API_KEY";

async function getWeather(city) {
    try {
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
            + city
            + "?key="
            + API_KEY
        );
        const weatherData = await response.json();
        console.log(weatherData);
        
        const date = weatherData.days;
        const conditions = weatherData.currentConditions.conditions;
        const humidity = weatherData.currentConditions.humidity;
        const visibility = weatherData.currentConditions.visibility;
        const sunrise = weatherData.currentConditions.sunrise;

        return {
            date,
            conditions,
            humidity,
            visibility,
            sunrise
        };

    } catch(error) {
        console.log(error);
    }
}

async function printBroadcast(broadcast) {
    let string = "";
    /*
    for(let i = 0; i < 7; i++){
        let curr = broadcast.day[i];
        string += "Day: " + (i+1) + 
            " | Date: " + curr.datetime +
            " | Max: " + curr.tempmax +
            " | Min: " + curr.tempmin +
            " | Temp: " + curr.temp + "\n";
    }
    */
    string = broadcast.date[0].temp;
    textbox.textContent = string;
    
}

async function isValidInput(city) {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        + city
        + "?key="
        + API_KEY
    );

    return response.ok;
}

const input = document.querySelector("#citySearch");
const textbox = document.querySelector("#response");


input.addEventListener("keydown", async(event) => {
    if (event.key === "Enter") {
        const city = input.value;

        if (await isValidInput(city)) {
            const weather = await getWeather(city);
            printBroadcast(weather);
        } else {
            textbox.textContent = "Error, Invalid City";
        }
    };
});