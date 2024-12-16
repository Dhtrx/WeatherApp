const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city:string): Promise<WeatherData | null> {

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=en`);
        if (!response.ok) {
            throw new Error("Not found");
        }
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }

}

function displayWeather(data: WeatherData): void {
    const weatherResult = document.getElementById("weatherResult");
    if (weatherResult) {
        weatherResult.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Description: ${data.weather[0].description}</p>
            `;
    }
}

document.getElementById("getWeather")?.addEventListener("click", async () => {
    const city = (document.getElementById("city") as HTMLInputElement).value;
    if (city) {
        const data = await fetchWeather(city);
        if (data) {
            displayWeather(data);
        } else {
            alert("Weather data could not be found");
        }
    } else {
        alert("Please enter a city.");
    }
})