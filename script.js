const apikey = "227fdb7d780b4a7e907140652250607";

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

    discity.innerText = data.location.name + ", " + data.location.country;
    temp.innerText = `Temperature : ${data.current.temp_c}°C`;
    weather.innerText = `Weather : ${data.current.condition.text}`;
    image.src = `https:${data.current.condition.icon}`;
    setDate(data);
  }
  function setDate(data) {
    const localDate = new Date(data.location.localtime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedTime = localDate.toLocaleString("en-US", options);
    time.innerText = `Local Time: ${formattedTime}`;
  }
  function displayError() {
    found.classList.add("hidden");
    diserror.classList.remove("hidden");
  }

  async function getData(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`;
    let response = await fetch(url);
    console.log("Status:", response.status);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    let data = await response.json();
    return data;
  }
});
