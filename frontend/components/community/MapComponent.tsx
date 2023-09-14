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
        Join community
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
    this.marker.bindPopup(`This is the ${this.name} community. ${buttonHTML}`);
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
    const locationName2 = new LocationMarker("Thiruvallur", [13.09, 80.0], map);
    const locationName3 = new LocationMarker("Koyambedu", [13.12331661152261, 79.9119954471171], map);
    const locationName4 = new LocationMarker("Avadi", [13.115109183685604, 80.09715939577096], map);
    const locationName5 = new LocationMarker("Perambur", [13.122153683315824, 80.23220367594958], map);
    const locationName6 = new LocationMarker("T nagar", [13.045936648337106, 80.23458999070583], map);
    const locationName7 = new LocationMarker("Egmore", [13.075898019411614, 80.26091980668487], map);
    const locationName8 = new LocationMarker("Anna nagar", [13.087962094106729, 80.20996144534884], map);

    locationName.createMarker();
    locationName2.createMarker();
    locationName3.createMarker();
    locationName4.createMarker();
    locationName5.createMarker();
    locationName6.createMarker();
    locationName7.createMarker();
    locationName8.createMarker();

    return () => {
      map.remove();
      locationName.removeMarker();
      locationName2.removeMarker();
      locationName3.removeMarker();
      locationName4.removeMarker();
      locationName5.removeMarker();
      locationName6.removeMarker();
      locationName7.removeMarker();
      locationName8.removeMarker();
    };
  }, []);

  return (
    <div id="map" className="map-container"></div>
  );
}

export default Map;