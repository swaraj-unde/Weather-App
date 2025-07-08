const apikey = "26c2dff86c69c57fa76736ce29249165";

document.addEventListener("DOMContentLoaded", () => {
  let field = document.getElementById("cityname");
  let button = document.getElementById("Wbutton");
  let diserror = document.getElementById("error");
  let discity = document.getElementById("displaycity");
  let temp = document.getElementById("Temp");
  let weather = document.getElementById("weather");
  let found = document.getElementById("found");
  let image = document.getElementById("image");
  let time = document.getElementById("local");

  diserror.classList.add("hidden");
  found.classList.add("hidden");

  button.addEventListener("click", async () => {
    let city = field.value.trim();
    if (!city) return;
    try {
      let data = await getData(city);
      displayData(data);
    } catch {
      displayError();
    }
  });

  function displayData(data) {
    found.classList.remove("hidden");
    diserror.classList.add("hidden");

    discity.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerText = `Temperature : ${data.main.temp}°C`;
    weather.innerText = `Weather : ${data.weather[0].description}`;
    image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    setDate(data);
  }

  function setDate(data) {
    const localTimeUTC = new Date((data.dt + data.timezone) * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    time.innerText = `Local Time: ${localTimeUTC.toLocaleString(
      "en-US",
      options
    )}`;
  }

  function displayError() {
    found.classList.add("hidden");
    diserror.classList.remove("hidden");
  }

  async function getData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    console.log(url);
    let response = await fetch(url);
    console.log("Status:", response.status);
    if (!response.ok) throw new Error("City Not Found");
    let data = await response.json();
    return data;
  }
});
