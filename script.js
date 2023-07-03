const getLocationBtn = document.getElementById('getLocationBtn');
const locationContainer = document.getElementById('locationContainer');
getLocationBtn.addEventListener('click', getLocation);
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showLocation,
            handleLocationError
        );
    } else {
        locationContainer.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationContainer.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;

    const mapContainer = document.getElementById('mapContainer');
    const map = L.map(mapContainer).setView([latitude, longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
}

function handleLocationError(error) {
    let message;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            break;
    }

    locationContainer.innerHTML = message;

}
const changeModeBtn = document.getElementById('changeModeBtn');
changeModeBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}