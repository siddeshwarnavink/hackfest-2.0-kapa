import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

class LocationMarker {
  name: string;
  coordinates: [number, number];
  map: L.Map;
  marker: L.Marker | null = null;

  constructor(name: string, coordinates: [number, number], map: L.Map) {
    this.name = name;
    this.coordinates = coordinates;
    this.map = map;
    this.marker = null;
  }

  createMarker() {

    // Create the marker and set the custom icon
    // this.marker = L.marker(this.coordinates).addTo(this.map);
    this.marker = L.marker(this.coordinates, {
      icon: L.icon({
        // iconUrl: process.env.NEXT_PUBLIC_LEAFLET_MAP_ICON, // Use the environment variable
        iconUrl: '/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    }).addTo(this.map);

    // Bind a popup to the marker
    this.marker.bindPopup(`This is the ${this.name} marker.`);

    let label = L.divIcon({ className: 'custom-label', html: this.name });

    L.marker([this.coordinates[0] - 0.001, this.coordinates[1]], { icon: label }).addTo(this.map);
    // Handle marker click to zoom to the location

    this.marker.on('click', () => {
      this.map.setView(this.coordinates, 13, { animate: true, duration: 3 }); // Adjust the zoom level and options as needed
    });
  }

  removeMarker() {
    if (this.marker) {
      this.marker.remove();
    }
  }
}

function Map() {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([13.0501, 80.2110], 13); // Set initial coordinates and zoom level

    // Add a tile layer (you can use different map providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locationName = new LocationMarker("SRM Vadapalani", [13.0501, 80.2110], map);
    const locationName2 = new LocationMarker("Koyambedu", [13.09, 80.0], map);
    // const loc3 = new LocationMarker("Bay Of Bengal", [13.01, 80.5], map);

    locationName.createMarker();
    locationName2.createMarker();
    // loc3.createMarker();

    // Cleanup when the component unmounts
    return () => {
      map.remove(); // Remove the map when the component unmounts
      // loc3.removeMarker();
      locationName.removeMarker();
      locationName2.removeMarker();
    };
  }, []);

  return (
  <div id="map" className="map-container"></div>
  );
}

export default Map;