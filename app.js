


const apiKey = "3ccae1e2bfe65ebb1d370d7c317d38b2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search-area input");
let searchBtn = document.querySelector(".search-place");
let resetBtn = document.querySelector(".reset-btn");

let container = document.querySelector(".container");

let weatherImg = document.querySelector(".weather-img");
let addRemove = document.querySelector(".hide");
let cityName = document.querySelector(".city");
let cityTemp = document.querySelector(".temp");
let minTemp = document.querySelector(".min");
let maxTemp = document.querySelector(".max");
let humidity = document.querySelector(".humi");
let windSpeed = document.querySelector(".wind");

let popup = document.querySelector(".stop-showing");
let popupCloseBtn = document.querySelector(".close");

const weatherData = async (city) => {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404){
        popup.classList.remove("stop-showing");
    }

    let showing = await response.json();

    cityName.innerHTML = showing.name;
    cityTemp.innerHTML = showing.main.temp + "°C";
    minTemp.innerHTML = showing.main.temp_min + "°C";
    maxTemp.innerHTML = showing.main.temp_max + "°C";
    humidity.innerHTML = showing.main.humidity + "%";
    windSpeed.innerHTML = showing.wind.speed + "km/p";

    if (showing.weather[0].main == "Clouds"){
        weatherImg.src = "clouds.png";
    } else if (showing.weather[0].main == "Snow"){
        weatherImg.src = "snow.png";
    }  else if (showing.weather[0].main == "Rain"){
        weatherImg.src = "rain.png";
    } else if (showing.weather[0].main == "Clear"){
        weatherImg.src = "clear.png";
    } else if (showing.weather[0].main == "Mist"){
        weatherImg.src = "mist.png";
    } else if (showing.weather[0].main == "Drizzle"){
        weatherImg.src = "drizzle.png";
    } 

    addRemove.classList.remove("hide");
    document.querySelector(".min-max-humid-wind").classList.remove("hide");
    document.querySelector(".city-temp").classList.remove("hide");

    container.style.borderRadius = "35px";
}

searchBtn.addEventListener("click" , () => {
    weatherData(searchBox.value);
});

popupCloseBtn.addEventListener("click" , () => {
    popup.classList.add("stop-showing");
    searchBox.value = "";
});

const resetData = async () => {
    addRemove.classList.add("hide");
    document.querySelector(".min-max-humid-wind").classList.add("hide");
    document.querySelector(".city-temp").classList.add("hide");
    cityName.innerHTML = "City Name";
    cityTemp.innerHTML = "";
    minTemp.innerHTML = "";
    maxTemp.innerHTML = "";
    humidity.innerHTML = "";
    windSpeed.innerHTML = "";
    searchBox.value = "";
}

resetBtn.addEventListener("click" , resetData);