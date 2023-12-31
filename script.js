const currentBtn = document.querySelector('#currentBtn')
const body = document.querySelector('body')
const main = document.querySelector('main')

window.addEventListener('load', () => currentWeather())

// fetching api
function currentWeather () {
  let long
  let lat
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
    console.log(position)

    long = position.coords.longitude
    lat = position.coords.latitude
    const api = `http://api.weatherapi.com/v1/forecast.json?key=3f5f1e7f0c3f4ee4baa135432230210&q=${lat},${long}&days=10&aqi=no&alerts=no`

    // fetching weather api
    fetch (api)
      .then ( response => response.json() )
      .then ( data => {
        addingMainHTML(data)
        addingHourlyWeather(data)
      } )
      .catch ( error => console.log(error) )
    } )
  } else {
    body.innerHTML = 'Allow location for the website to work.'
  }
}

// adding html to the main section
function addingMainHTML(data) {
  const cityName = data.location.name
  const countryName = `${data.location.region}, ${data.location.country}`
  const dateInfo = `${data.forecast.forecastday[0].date.replace(/-/g, '/')}`
  const timeInfo = `${data.location.localtime.slice(11)}`
  const tempInfo = data.current.temp_c
  const tempIconInfo = data.current.condition.icon
  const tempTextInfo = data.current.condition.text
  const sunsetSrc = `images/moon.png`
  const sunriseSrc = `images/sun.jpg`
  const sunsetTxt = `<span>${data.forecast.forecastday[0].astro.sunset}</span>Sunset`
  const sunriseTxt = `<span>${data.forecast.forecastday[0].astro.sunrise}</span>Sunrise`

  // create elements
  const addressContainer = document.createElement('div')
  const tempContainer = document.createElement('div')
  const city = document.createElement('p')
  const country = document.createElement('p')
  const date = document.createElement('p')
  const time = document.createElement('span')
  const temp = document.createElement('div')
  const degrees = document.createElement('span')
  const tempIcon = document.createElement('img')
  const tempText = document.createElement('div')
  const sunset = document.createElement('div')
  const sunrise = document.createElement('div')
  const sunsetImg = document.createElement('img')
  const sunriseImg = document.createElement('img')


  // add text content to the elements
  city.innerHTML = cityName
  country.innerHTML = countryName
  date.innerHTML = dateInfo
  time.innerHTML = timeInfo
  temp.innerHTML = tempInfo
  tempIcon.src = tempIconInfo
  tempText.innerHTML = tempTextInfo
  degrees.innerHTML = '℃'
  sunsetImg.src = sunsetSrc
  sunriseImg.src = sunriseSrc
  sunset.innerHTML = sunsetTxt
  sunrise.innerHTML = sunriseTxt

  // add classes
  city.classList.add('city')
  country.classList.add('country')
  date.classList.add('date')
  time.classList.add('time')
  addressContainer.classList.add('addressContainer')
  tempContainer.classList.add('tempContainer')
  temp.classList.add('temp')
  tempIcon.classList.add('tempIcon')
  tempIcon.setAttribute('alt', 'Weather Icon')
  tempText.classList.add('tempText')
  degrees.classList.add('degrees')
  sunset.classList.add('sunset')
  sunrise.classList.add('sunrise')
  sunriseImg.classList.add('sunriseImg')
  sunsetImg.classList.add('sunsetImg')
  sunriseImg.setAttribute('alt', 'sunrise icon')
  sunsetImg.setAttribute('alt', 'sunset icon')


  // append children to the parent element
  main.appendChild(addressContainer)
  main.appendChild(tempContainer)
  addressContainer.appendChild(city)
  addressContainer.appendChild(country)
  addressContainer.appendChild(time)
  addressContainer.appendChild(date)
  addressContainer.appendChild(sunrise)
  addressContainer.appendChild(sunset)
  tempContainer.appendChild(temp)
  tempContainer.appendChild(tempIcon)
  tempContainer.appendChild(tempText)
  temp.appendChild(degrees)
  sunrise.appendChild(sunriseImg)
  sunset.appendChild(sunsetImg)
}

// adding html to the hourly weather Container
function addingHourlyWeather(data) {
  let hourlyWeatherContainer = document.querySelector('.hourlyWeatherContainer')

  // add 24 <div> to hourlyWeatherContainer
  for (i = 0; i < 24; i++) {
    hourlyWeatherContainer.innerHTML += `<div class='hourlyContainer' id='time-${data.forecast.forecastday[0].hour[i].time.slice(11)}'></div>`
  }

  const hourlyContainerAll = document.querySelectorAll('.hourlyContainer')

  // loop though the hourlyContainer to append children
  hourlyContainerAll.forEach( (e, i) => {
    // creating variable for data
    const hourInfo = data.forecast.forecastday[0].hour[i].time.slice(11)
    const icon = data.forecast.forecastday[0].hour[i].condition.icon
    const textInfo = data.forecast.forecastday[0].hour[i].condition.text
    const tempInfo = data.forecast.forecastday[0].hour[i].temp_c

    // creating element for hourly forecast
    const hourDaily = document.createElement('p')
    const iconImgDaily = document.createElement('img')
    const textDaily = document.createElement('p')
    const tempDaily = document.createElement('p')

    // creating classlist
    hourDaily.classList.add('hourDaily')
    iconImgDaily.classList.add('iconImgDaily')
    textDaily.classList.add('textDaily')
    tempDaily.classList.add('tempDaily')

    // add content to the element
    hourDaily.innerHTML = hourInfo
    iconImgDaily.src = icon
    textDaily.innerHTML = textInfo
    tempDaily.innerHTML = `${tempInfo} ℃`

    e.appendChild(hourDaily)
    e.appendChild(iconImgDaily)
    e.appendChild(textDaily)
    e.appendChild(tempDaily)
  })
}