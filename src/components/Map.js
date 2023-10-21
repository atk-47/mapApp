import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null)
  const { apikey, userPosition, restaurantPosition , data, length} = props;
  console.log(props);
  console.log(userPosition)
  useEffect(
    () => {
      //route calculation
      if (restaurantPosition) {
        calculateRoute(platform.current, map.current, userPosition, restaurantPosition);
      }
      // Check if the map object has already been created
      if (!map.current) {
        // Create a platform object with the API key
        platform.current = new H.service.Platform({ apikey });
        // Create a new Raster Tile service instance
        const rasterTileService = platform.current.getRasterTileService({
          queryParams: {
            style: "explore.day",
            size: 512,
          },
        });
        // Creates a new instance of the H.service.rasterTile.Provider class
        // The class provides raster tiles for a given tile layer ID and pixel format
        const rasterTileProvider = new H.service.rasterTile.Provider(
          rasterTileService
        );
        // Create a new Tile layer with the Raster Tile provider
        const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
        // Create a new map instance with the Tile layer, center and zoom level
        const newMap = new H.Map(mapRef.current, rasterTileLayer, {
          pixelRatio: window.devicePixelRatio,
          center: {
            lat: userPosition['lat'],
            lng: userPosition['lng'],
          },
          zoom: 13,
        });
 
        // Add panning and zooming behavior to the map
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(newMap)
        );
 
        // Set the map object to the reference
        map.current = newMap;
      }
      const coords = userPosition;
      var marker = new H.map.Marker(
        coords,{
          icon : getMarkerIcon('green')
        }
      )
      map.current.addObject(marker);
    },
    // Dependencies array
    [apikey, userPosition, restaurantPosition, length]
  );

  if(length!==0){
    console.log('hello');
    data.forEach(entry => {
      const coords = entry.location;
      console.log(coords);
      var marker = new H.map.Marker(
        coords,{
          icon : getMarkerIcon('red')
        }
      )
      map.current.addObject(marker);
    })
  }
 
  // Return a div element to hold the map
  return <div style={ { width: "100%", height: "730px" } } ref={mapRef} />;
 
}

// const newMap = new H.Map(
//   mapRef.current,
//   rasterTileLayer, {
//       pixelRatio: window.devicePixelRatio,
//       center: userPosition,
//       zoom: 14,
//   },
// );

function getMarkerIcon(color) {
  const svgCircle = `<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="marker">
              <circle cx="10" cy="10" r="7" fill="${color}" stroke="${color}" stroke-width="4" />
              </g></svg>`;
  return new H.map.Icon(svgCircle, {
      anchor: {
          x: 10,
          y: 10
      }
  });
}

function calculateRoute(platform, map, start, destination) {
  function routeResponseHandler(response) {
      const sections = response.routes[0].sections;
      const lineStrings = [];
      sections.forEach((section) => {
          // convert Flexible Polyline encoded string to geometry
          lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
      });
      const multiLineString = new H.geo.MultiLineString(lineStrings);
      const bounds = multiLineString.getBoundingBox();

      // Create the polyline for the route
      const routePolyline = new H.map.Polyline(multiLineString, {
          style: {
              lineWidth: 5
          }
      });

      // Remove all the previous map objects, if any
      map.removeObjects(map.getObjects());
      // Add the polyline to the map
      map.addObject(routePolyline);
      map.addObjects([
          // Add a marker for the user
          new H.map.Marker(start, {
              icon: getMarkerIcon('red')
          }),
          // Add a marker for the selected restaurant
          new H.map.Marker(destination, {
              icon: getMarkerIcon('green')
          })
      ]);
  }

  // Get an instance of the H.service.RoutingService8 service
  const router = platform.getRoutingService(null, 8);

  // Define the routing service parameters
  const routingParams = {
      'origin': `${start.lat},${start.lng}`,
      'destination': `${destination.lat},${destination.lng}`,
      'transportMode': 'car',
      'return': 'polyline'
  };
  // Call the routing service with the defined parameters
  router.calculateRoute(routingParams, routeResponseHandler, console.error);
}




export default Map;

