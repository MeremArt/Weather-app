document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    getWeather();
    hideInput();
  });
});

function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value;

  $.ajax({
    type: "POST",
    url: "/weather",
    data: { city: city },
    success: function (data) {
      displayWeather(data);
    },
    error: function (error) {
      console.error("Error fetching weather data:", error);
    },
  });
}

function hideInput() {
  const inputContainer = document.getElementById("weather-container");
  const cityInput = document.getElementById("city");
  const searchButton = document.getElementById("searchButton");
  const header = document.getElementById("Header"); // Corrected the ID

  if (inputContainer && cityInput && searchButton && header) {
    inputContainer.removeChild(cityInput);
    inputContainer.removeChild(searchButton);
    inputContainer.removeChild(header);
  }
}

function displayWeather(data) {
  const tempDiv = document.getElementById("temp-div");
  const weatherInfo = document.getElementById("weather-info");
  const cityDisplay = document.getElementById("cityDisplay");

  // Clear previous content
  if (weatherInfo && tempDiv && cityDisplay) {
    weatherInfo.innerHTML = "";
    tempDiv.innerHTML = "";
    cityDisplay.innerHTML = ""; // Clear the content instead of assigning an empty string

    if (data.cod === "404") {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
      tempDiv.innerHTML = `<p>${Math.round(data.temperature - 273.15)}°C</p>`;
      weatherInfo.innerHTML = `<p>${data.description}</p>`;
      cityDisplay.innerHTML = `<p>Weather in ${data.city}</p>`;
    }
  }
}
