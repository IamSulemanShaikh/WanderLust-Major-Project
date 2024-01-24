mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",

  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //listing.geometry.corrdinnate
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<p> Exact Location will be provided after booking </p>`
    )
  )
  .addTo(map);