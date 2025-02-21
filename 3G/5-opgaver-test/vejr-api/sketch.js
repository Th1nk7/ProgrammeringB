let wmoData

function preload() {
  wmoData = loadJSON('./wmo_codes.json')
}

function setup() {
  noCanvas()
  const searchedPlace = select('#searchPlace')
  const searchBtn = select('#searchButton')
  searchBtn.mousePressed(() => {
    searchPlace(searchedPlace.value())
  })
}

async function searchPlace(searchedPlace) {
  const place = searchedPlace
  const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${place}&format=jsonv2`)
  const resJSON = await response.json()

  if(resJSON.length > 0){
    const lat = Number(resJSON[0].lat)
    const lon = Number(resJSON[0].lon)
    select('#placeDisplay').html(resJSON[0].display_name.split(",",1))
    {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    const resJSON = await response.json()
    select('#tempDisplay').html(`Temperature:<br>${resJSON.current_weather.temperature}°C`)
    select('#windspeedDisplay').html(`Windspeed:<br>${resJSON.current_weather.windspeed}km/h`)

    if (resJSON.current_weather.is_day == 0 && select('#mainDisplay').hasClass('day')) {
      select('#mainDisplay').removeClass('day')
      select('#mainDisplay').addClass('night')
    }
    else if (resJSON.current_weather.is_day == 1 && select('#mainDisplay').hasClass('night')) {
      select('#mainDisplay').removeClass('night')
      select('#mainDisplay').addClass('day')
    }

    select('#weatherImg').attribute('src', wmoData[str(resJSON.current_weather.weathercode)][resJSON.current_weather.is_day ? "day" : "night"]["image"])
    select('#descDisplay').html(`Weather:<br>${wmoData[str(resJSON.current_weather.weathercode)][resJSON.current_weather.is_day ? "day" : "night"]["description"]}`)
    
    console.log(resJSON)
    }
  }
  else {
    alert('No results found!')
  }

}