
const LocationField = () => {
  const location = {
    lat: 41.002292,
    lng: 29.367437,
  };

  const getMapLink = () => {
    const userAgent = navigator.userAgent || navigator.vendor || "";

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      return `https://maps.apple.com/?ll=${location.lat},${location.lng}`;
    } else if (isAndroid) {
      return `geo:${location.lat},${location.lng}?q=${location.lat},${location.lng}`;
    } else {
      return `https://maps.google.com/?q=${location.lat},${location.lng}`;
    }
  };

  const mapLink = getMapLink();
  const iframeSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  return (
    <section className="w-full bg-gray-100 p-4 rounded-xl shadow-md" style={{ height: "470px" }}>
      <a href={mapLink} target="_blank" rel="noopener noreferrer">
        <div
          className="rounded-lg overflow-hidden cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-400 transition"
          style={{ height: "100%" }}
        >
          <iframe
            src={iframeSrc}
            allowFullScreen
            loading="lazy"
            title="Google Map"
            style={{ width: "100%", height: "100%", border: 0 }}
          ></iframe>
        </div>
      </a>
    </section>
  );
};

export default LocationField;

