//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getCoordinates(countryName) {
    const url = `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=json&limit=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        throw new Error("Country not found");
      }
    } catch (error) {
      console.error("Failed to get coordinates:", error.message);
      return null;
    }
  }

  /* Example usage:
getCoordinates("Denmark").then(coords => {
    if (coords) {
        console.log(`Denmark's coordinates:`, coords);
    }
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const alienLetters = ['\u{23C3}','\u{23DA}','\u{260A}','\u{2385}','\u{27D2}','\u{238E}','\u{260C}','\u{2291}','\u{27DF}','\u{27CA}','\u{260D}','\u{2330}','\u{22D4}','\u{22CF}','\u{235C}','\u{233F}','\u{237E}','\u{2340}','\u{2307}','\u{23C1}','\u{238D}','\u{2390}','\u{2359}','\u{2316}','\u{22AC}','\u{22C9}']

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const map = L.map('map').setView([20, 0], 2)
const markers = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function addMarker(lat, lng, iconURL, onClickFunction) {
    const icon = L.icon({
        iconUrl: `${iconURL}`,
        iconSize: [128, 128],
        iconAnchor: [64,0],
    });
    const marker = L.circleMarker([lat, lng], {
        icon
    }).addTo(map);

    marker.on('click', onClickFunction);

    markers.push(marker);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getRandomHuman() {
    const res = await fetch("https://randomuser.me/api/1.4/?inc=name,location,picture,dob&noinfo")
    const data = await res.json()
    const latlngData = getCoordinates(`${data.results[0].location.country}`).then(coords => {return faker.address.nearbyGPSCoordinates([coords.lat, coords.lon], 500, true)});
    const ret = {
        "name": `${data.results[0].name.first} ${data.results[0].name.last}`,
        "age": data.results[0].dob.age,
        "country": data.results[0].location.country,
        "lat": latlngData[0],
        "lng": latlngData[1],
        "iconURL": data.results[0].picture.large
    }
    return ret
}

async function getRandomAlien() {
    const res = await fetch("https://randomuser.me/api/1.4/?inc=name,location&noinfo")
    const data = await res.json()
    const latlngData = getCoordinates(`${data.results[0].location.country}`).then(coords => {return faker.address.nearbyGPSCoordinates([coords.lat, coords.lon], 500, true)});
    const ret = {
        "name": `${data.results[0].name.first} ${shuffle(data.results[0].name.last.split('')).join('')}`,
        "age": Math.ceil(random(-999,1337)),
        "country": data.results[0].location.country.split('').reverse().join(''),
        "lat": latlngData[0],
        "lng": latlngData[1],
        "iconURL": "alienIcon.png"
    }
    return ret
}