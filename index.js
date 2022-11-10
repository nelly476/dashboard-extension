fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    let cacheName = "imageCache";
    let url = data.urls.regular;
    setInterval(() => {
      caches.delete(cacheName);
      caches.open(cacheName).then((cache) => {
        cache.add(url);
      });
    }, 3600000);

    caches.open(cacheName).then((cache) => {
      cache.keys().then((arrayOfRequest) => {
        document.body.style.backgroundImage = `url(${arrayOfRequest[0].url})`;
      });
    });
  });

// let cacheName = "imageCache";
// let url =
//   "http://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
// caches.open(cacheName).then((cache) => {
//   cache.add(url).then(() => console.log("done"));
// });
// caches.open(cacheName).then((cache) => {
//   cache.match(url).then((settings) => {
//     fetch(`${settings.url}`, { cache: "force-cache" })
//       .then((res) => res.json())
//       .then((data) => {
//         document.body.style.backgroundImage = `url(${data.urls.regular})`;
//       });
//   });
// });

// function deleteCache() {
//   caches.delete(cacheName).then(() => {
//     console.log("deleted");
//   });
// }

// deleteCache();

// fetch(
//   "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
// )
//   .then((res) => res.json())
//   .then((data) => {
//     document.body.style.backgroundImage = `url(${data.urls.regular})`;
//     document.getElementById("author").textContent = `By: ${data.user.name}`;
//   })
//   .catch((err) => {
//     // Use a default background image/author
//     document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
// )`;
//     document.getElementById("author").textContent = `By: Dodi Achmad`;
//   });

// fetch(
//   "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
// )
//   .then((res) => res.json())
//   .then((data) => {
//     document.body.style.backgroundImage = `url(${data.urls.regular})`;
//     document.getElementById("author").textContent = `By: ${data.user.name}`;
//   })
//   .catch((err) => {
//     // Use a default background image/author
//     document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
// )`;
//     document.getElementById("author").textContent = `By: Dodi Achmad`;
//   });

fetch(
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/rub.json"
)
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    const number = Math.round(data.rub * 100) / 100;
    document.getElementById("exchange").innerHTML = `
<p>1 usd = ${number} rub</p>
        `;
  })
  .catch((err) => console.error(err));

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
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
    .catch((err) => console.error(err));
});

fetch("https://api.goprogram.ai/inspiration", { cache: "reload" })
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("quote").innerHTML = `
    <h2 class="quote">${data.quote}</h2>
<h3 class="quote-author">${data.author}</h3>
    `;
  });
