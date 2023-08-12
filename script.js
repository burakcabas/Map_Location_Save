// script.js

// Leaflet harita oluşturma
const map = L.map('map').setView([37.05612, 29.10999], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Nokta verilerini saklamak için bir dizi
const points = [];

// Harita ortasındaki noktayı kaydetme
document.getElementById('saveButton').addEventListener('click', () => {
    const center = map.getCenter();
    const point = {
        id: points.length,
        lat: center.lat,
        lng: center.lng,
        datetime: new Date().toISOString()
    };
    points.push(point);
    updatePointList();
});

// Nokta listesini güncelleme
function updatePointList() {
    const pointList = document.getElementById('pointList');
    pointList.innerHTML = '';
    points.forEach(point => {
        const pointItem = document.createElement('div');
        pointItem.textContent = `Nokta ${point.id} - Lat: ${point.lat}, Lng: ${point.lng}`;
        pointItem.addEventListener('click', () => {
            createMarker(point.lat, point.lng);
        });
        pointList.appendChild(pointItem);
    });
}

// Haritada marker oluşturma
function createMarker(lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
}

// İndir butonu için JSON verisini indirme
document.getElementById('downloadButton').addEventListener('click', () => {
    const data = JSON.stringify(points, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'points.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Nokta listesini sayfa yüklendiğinde güncelle
window.addEventListener('DOMContentLoaded', () => {
    updatePointList();
});
