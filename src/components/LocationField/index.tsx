
const LocationField = () => {
  const location = {
    lat: 41.002292,
    lng: 29.367437,
  };

  const mapLink = `https://maps.google.com/?q=${location.lat},${location.lng}`;

  return (
    <section className="w-full bg-gray-100 p-4 rounded-xl shadow-md" style={{ height: "470px" }}>
      <a href={mapLink} target="_blank" rel="noopener noreferrer">
        <div className="rounded-lg overflow-hidden cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-400 transition" style={{ height: "100%" }}>
          <iframe
            src={`https://maps.google.com/maps?t=m&output=embed&z=15&q=${location.lat},${location.lng}`}
            allowFullScreen
            loading="lazy"
            title="Google Map"
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </div>
      </a>
    </section>
  );
};

export default LocationField;

