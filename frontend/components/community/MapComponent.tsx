import { useContext, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import ReactDOMServer from 'react-dom/server';
import { Button } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import communityContext from '@/context/community';
import { notifications } from '@mantine/notifications';

function SwitchCommunityButton(props: { name: string }) {
  // const queryClient = useQueryClient();
  const communityCtx = useContext(communityContext);

  const switchCommunity = (community: any) => {
    // queryClient.invalidateQueries({ queryKey: ['homeFeed', communityCtx.community] });
    communityCtx.setCommunity(community.id);
    communityCtx.setCommunityName(community.name);
    console.log(`Switching to ${community.name} ${community.id}`);
    notifications.show({
      title: 'Community',
      message: `Currently on "${community.name}" community`,
    });
  };

  return (
    <div>
      <Button
        color='blue'
        id={`switch-${props.name.replace(' ', '-')}`}
        onClick={() => switchCommunity(props.name === 'SRM Vadapalani' ? { id: 'dffc1370-5247-11ee-ac55-ac1203516bd9', name: 'SRM Vadapalani' } : { id: 'dffc0b77-5247-11ee-ac55-ac1203516bd9', name: 'Koyambedu' })}
      >
        Switch
      </Button>
    </div>
  );
}

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

    this.marker = L.marker(this.coordinates, {
      icon: L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    }).addTo(this.map);
    const buttonHTML = ReactDOMServer.renderToString(
      <SwitchCommunityButton name={this.name} />
    );
    this.marker.bindPopup(`This is the ${this.name} community. ${buttonHTML}`); // i want to add a <Button /> here
    let label = L.divIcon({ className: 'custom-label', html: this.name });

    L.marker([this.coordinates[0] - 0.001, this.coordinates[1]], { icon: label }).addTo(this.map);
    this.marker.on('click', () => {
      this.map.setView(this.coordinates, 13, { animate: true, duration: 3 });
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
    const map = L.map('map').setView([13.0501, 80.2110], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locationName = new LocationMarker("SRM Vadapalani", [13.0501, 80.2110], map);
    const locationName2 = new LocationMarker("Koyambedu", [13.09, 80.0], map);

    locationName.createMarker();
    locationName2.createMarker();

    return () => {
      map.remove();
      locationName.removeMarker();
      locationName2.removeMarker();
    };
  }, []);

  return (
    <div id="map" className="map-container"></div>
  );
}

export default Map;