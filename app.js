

fetch("https://api.unsplash.com/photos/random?client_id=tV97VH0OYaR25Y8GrUDsb1P498_gmEdRgzK4wdk0vm8&orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data =>{
        console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById('author').textContent = `${data.user.name}`
    })
    .catch(function (error){
        document.body.style.backgroundImage = `url('https://i.pinimg.com/474x/07/dc/5a/07dc5ac15c79e6a3f0534799cee5ac8c.jpg')`
    })

  


fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => response.json())
    .then(data =>{
        document.querySelector('.crypto').innerHTML = ''
        document.querySelector('.crypto').innerHTML +=`
        <div class="crypto-title">
            <img src=${data.image.small}>
            <span id="name">${data.name}<span>
        </div>
        ` 
        document.querySelector('.crypto').innerHTML +=`
        <div class="crypto-price"> 
            <p>Current🎯: ${data.market_data.current_price.usd}</p>
            <p>High👆: ${data.market_data.high_24h.usd}</p>
            <p>Low🔻: ${data.market_data.low_24h.usd}</p>
        </div>
        `
    })








setInterval(updateTime, 1000)


function updateTime(){
    const date = new Date()
    document.getElementById('time').textContent = date.toLocaleTimeString('en-US')
}

window.addEventListener('DOMContentLoaded', updateTime)


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById('weather').textContent = "Geolocation is not supported by this browser."
    }
  }
  
  function showPosition(position) {
   // document.querySelector('.weather').innerHTML

    console.log(position.coords.latitude) 
    console.log(position.coords.longitude)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bf09c3306fec22e396ee9db9afb9181e`)
        .then(response => response.json())
        .then(data => {
            
            console.log(data)

            let fahrenheit = Math.round(((data.main.temp - 273.15) * 9/5 + 32))
            console.log(fahrenheit)
            document.querySelector(".weather").innerHTML = ''
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.querySelector(".weather").innerHTML += `
            <div class="weather-logo">    
                <img src=${iconUrl} />
                <p class="weather-temp">${fahrenheit}º</p>
            </div>
            `
            document.querySelector(".weather").innerHTML += `
            <div class="weather-city">
                <span class="city">${data.name}</span>
                <span>${data.sys.country}</span>
            </div>
            `
            
        })
  }

  getLocation()