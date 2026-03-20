// ── Map State ─────────────────────────────────
let map, userMarker, userCircle, pinMarker, pinCircle;
let userLat = null, userLng = null;
let pinLat  = null, pinLng  = null;
let pinMode = false;

// ── Custom Icons ──────────────────────────────
const userIcon = L.divIcon({
  className: '',
  html: `<div class="lf-user-dot">
           <div class="lf-user-pulse"></div>
           <div class="lf-user-core"></div>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function makePinIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div class="lf-pin" style="background:${color}">
             <div class="lf-pin-tip" style="border-top-color:${color}"></div>
           </div>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36]
  });
}

const catColors = {
  road:     '#dc2626',
  drain:    '#d97706',
  light:    '#7c3aed',
  waste:    '#1a6b4a',
  default:  '#1a6b4a'
};

// ── Init Map ──────────────────────────────────
function initMap(lat, lng) {
  if (map) return;

  map = L.map('leaflet-map', {
    center: [lat, lng],
    zoom: 16,
    zoomControl: true
  });

  // OpenStreetMap tiles — free, no API key
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  // Click on map to drop pin
  map.on('click', function(e) {
    if (!pinMode) return;
    dropPin(e.latlng.lat, e.latlng.lng);
  });
}

// ── Locate User ───────────────────────────────
function locateMe() {
  const hint  = document.getElementById('map-hint');
  const pulse = document.getElementById('gps-pulse');
  const coords = document.getElementById('gps-coords');

  if (hint) hint.textContent = 'Getting your location...';
  if (pulse) pulse.style.animationPlayState = 'running';

  if (!navigator.geolocation) {
    showFallback();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;

      // Init or pan map
      if (!map) {
        initMap(userLat, userLng);
      } else {
        map.setView([userLat, userLng], 16);
      }

      // Remove old markers
      if (userMarker) map.removeLayer(userMarker);
      if (userCircle) map.removeLayer(userCircle);

      // Add user location marker
      userMarker = L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<strong>You are here</strong>')
        .openPopup();

      // 500m radius circle
      userCircle = L.circle([userLat, userLng], {
        radius: 500,
        color: '#1a6b4a',
        fillColor: '#1a6b4a',
        fillOpacity: 0.06,
        weight: 1.5,
        dashArray: '6 4'
      }).addTo(map);

      // Update GPS bar
      if (coords) coords.textContent =
        `${userLat.toFixed(5)}° N, ${userLng.toFixed(5)}° E`;

      // Reverse geocode for address
      reverseGeocode(userLat, userLng, addr => {
        if (coords) coords.textContent =
          `${userLat.toFixed(4)}° N, ${userLng.toFixed(4)}° E — ${addr}`;
      });

      if (hint) hint.textContent = 'Location found. Click "Drop pin" then tap the map to mark the issue.';

      // Add sample nearby issues
      addSampleIssues(userLat, userLng);
    },
    err => {
      showFallback();
      if (hint) hint.textContent = 'Location access denied. Showing default location.';
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// ── Drop Pin Mode ─────────────────────────────
function enablePinMode() {
  if (!map) {
    locateMe();
    setTimeout(() => { pinMode = true; updatePinModeUI(); }, 2000);
    return;
  }
  pinMode = true;
  updatePinModeUI();
}

function updatePinModeUI() {
  const hint   = document.getElementById('map-hint');
  const mapEl  = document.getElementById('leaflet-map');
  if (hint)  hint.textContent = 'Tap anywhere on the map to drop an issue pin';
  if (mapEl) mapEl.style.cursor = 'crosshair';
  document.getElementById('btn-pin')?.classList.add('active');
}

function dropPin(lat, lng) {
  pinLat = lat;
  pinLng = lng;
  pinMode = false;

  const mapEl = document.getElementById('leaflet-map');
  if (mapEl) mapEl.style.cursor = '';

  // Get selected category color
  const activeCat = document.querySelector('.cat-btn.active')?.dataset.cat || 'default';
  const color = catColors[activeCat] || catColors.default;

  if (pinMarker) map.removeLayer(pinMarker);
  if (pinCircle) map.removeLayer(pinCircle);

  pinMarker = L.marker([lat, lng], { icon: makePinIcon(color), draggable: true })
    .addTo(map)
    .bindPopup(`<strong>Issue location</strong><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
    .openPopup();

  // Draggable pin — update coords on drag
  pinMarker.on('dragend', function(e) {
    const pos = e.target.getLatLng();
    pinLat = pos.lat;
    pinLng = pos.lng;
    updatePinInfo(pos.lat, pos.lng);
  });

  // 200m soft radius around pin
  pinCircle = L.circle([lat, lng], {
    radius: 200,
    color: color,
    fillColor: color,
    fillOpacity: 0.08,
    weight: 1,
    dashArray: '4 4'
  }).addTo(map);

  updatePinInfo(lat, lng);

  // Show clear button
  document.getElementById('btn-clear').style.display = '';
  document.getElementById('btn-pin')?.classList.remove('active');
  document.getElementById('map-hint').textContent = 'Pin placed. Drag it to adjust position.';
}

function updatePinInfo(lat, lng) {
  const pinInfo   = document.getElementById('pin-info');
  const pinCoords = document.getElementById('pin-coords');
  if (pinInfo)   pinInfo.style.display = 'flex';
  if (pinCoords) pinCoords.textContent = `${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`;
}

function clearPin() {
  if (pinMarker) { map.removeLayer(pinMarker); pinMarker = null; }
  if (pinCircle) { map.removeLayer(pinCircle); pinCircle = null; }
  pinLat = null;
  pinLng = null;
  document.getElementById('btn-clear').style.display = 'none';
  document.getElementById('pin-info').style.display = 'none';
  document.getElementById('map-hint').textContent = 'Click "Drop pin" then tap the map to mark the issue.';
}

// ── Reverse Geocode (Nominatim — free) ────────
function reverseGeocode(lat, lng, callback) {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    .then(r => r.json())
    .then(data => {
      const a = data.address || {};
      const parts = [
        a.road || a.pedestrian || a.path,
        a.suburb || a.neighbourhood || a.quarter,
        a.city || a.town || a.village
      ].filter(Boolean);
      callback(parts.join(', ') || 'Location found');
    })
    .catch(() => callback('Location found'));
}

// ── Sample Issues (around user) ───────────────
function addSampleIssues(lat, lng) {
  const issues = [
    { dlat:  0.002, dlng:  0.003, cat: 'road',  label: 'Pothole',       color: '#dc2626' },
    { dlat: -0.003, dlng:  0.002, cat: 'drain',  label: 'Blocked drain', color: '#d97706' },
    { dlat:  0.001, dlng: -0.004, cat: 'light',  label: 'Street light',  color: '#7c3aed' },
    { dlat: -0.002, dlng: -0.002, cat: 'waste',  label: 'Dumping',       color: '#1a6b4a' },
  ];

  issues.forEach(issue => {
    const icon = L.divIcon({
      className: '',
      html: `<div class="lf-issue-dot" style="background:${issue.color}" title="${issue.label}">
               <div class="lf-issue-ring" style="border-color:${issue.color}"></div>
             </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([lat + issue.dlat, lng + issue.dlng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${issue.label}</strong><br>Category: ${issue.cat}`);
  });
}

// ── Fallback location (Bengaluru) ─────────────
function showFallback() {
  const fallbackLat = 12.9716;
  const fallbackLng = 77.5946;
  if (!map) initMap(fallbackLat, fallbackLng);
  const coords = document.getElementById('gps-coords');
  if (coords) coords.textContent = `${fallbackLat}° N, ${fallbackLng}° E — MG Road, Bengaluru (default)`;
  addSampleIssues(fallbackLat, fallbackLng);
}

// ── File Upload ───────────────────────────────
function triggerUpload() {
  document.getElementById('file-input')?.click();
}

function handleFile(input) {
  const file = input.files[0];
  if (!file) return;
  const zone    = document.getElementById('upload-zone');
  const preview = document.getElementById('photo-preview');
  const name    = document.getElementById('photo-name');
  if (zone)    zone.style.display = 'none';
  if (preview) preview.classList.add('visible');
  if (name)    name.textContent = file.name;
}

// ── Submit ────────────────────────────────────
function submitReport() {
  if (!pinLat && !userLat) {
    const hint = document.getElementById('map-hint');
    if (hint) hint.textContent = 'Please locate yourself or drop a pin first.';
    hint.style.color = '#dc2626';
    return;
  }

  const lat   = pinLat  || userLat;
  const lng   = pinLng  || userLng;
  const cat   = document.querySelector('.cat-btn.active')?.dataset.cat || 'road';
  const desc  = document.getElementById('issue-desc')?.value || '';

  const report = {
    lat, lng, cat, desc,
    timestamp: new Date().toISOString()
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('civicpulse_reports') || '[]');
  existing.unshift(report);
  localStorage.setItem('civicpulse_reports', JSON.stringify(existing));

  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toast-msg');
  if (msg) msg.textContent = `Report saved at ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
  if (toast) {
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 4000);
  }

  clearPin();
  if (document.getElementById('issue-desc')) document.getElementById('issue-desc').value = '';
}

// ── Auto-init ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Start with fallback map immediately so it's visible
  showFallback();
  // Then try to get real location
  setTimeout(locateMe, 500);
});
