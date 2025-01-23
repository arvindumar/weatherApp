const API_KEY = "c69028858ce3470ab2e160801252301";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const location = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");

  if (!location) {
    weatherResult.innerHTML = "Please enter a location.";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = data.current.temp_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
      const airQuality = data.current.air_quality;

      weatherResult.innerHTML = `
                <h2>${data.location.name}, ${data.location.region}</h2>
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} kph</p>
                <h3>Air Quality</h3>
                <p>PM2.5: ${airQuality.pm2_5} µg/m³</p>
                <p>PM10: ${airQuality.pm10} µg/m³</p>
                <p>Ozone: ${airQuality.o3} µg/m³</p>
            `;
    })
    .catch((error) => {
      weatherResult.innerHTML = error.message;
    });
});
