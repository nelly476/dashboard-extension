fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.urls.full);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1486912500284-6f2462ba07ea?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njc5MzM3NzM&ixlib=rb-4.0.3&q=80)`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
`;
    document.getElementById("crypto").innerHTML += `
<p>🎯: $${data.market_data.current_price.usd}</p>
<p>👆: $${data.market_data.high_24h.usd}</p>
<p>👇: $${data.market_data.low_24h.usd}</p>
`;
  })
  .catch((err) => console.log(err));

function updateClock() {
  const date = new Date();

  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    {
      timeStyle: "short",
    }
  );
}

setInterval(updateClock, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("oops!");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
      <img src=${iconUrl} />
      <p class="weather-temp">${Math.round(data.main.temp)}º</p>
      <p class="weather-city">${data.name}</p>
  `;
    })
    .catch((err) => console.log(err));
});
