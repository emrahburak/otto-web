
import React from "react";

interface LocationFieldProps {
  mapUrl: string;
}

function extractCoordinates(url: string): { lat: number; lng: number } | null {
  const googleMatch = url.match(/@([-.\d]+),([-.\d]+)/) || url.match(/q=([-.\d]+),([-.\d]+)/);
  const appleMatch = url.match(/ll=([-.\d]+),([-.\d]+)/);

  if (googleMatch) {
    const [, lat, lng] = googleMatch;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }

  if (appleMatch) {
    const [, lat, lng] = appleMatch;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }

  return null;
}

const LocationField: React.FC<LocationFieldProps> = ({ mapUrl }) => {
  const location = extractCoordinates(mapUrl);

  if (!location) return <div className="text-red-500">Konum alınamadı</div>;

  const getPlatformMapLink = () => {
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

  const platformLink = getPlatformMapLink();
  const iframeSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  return (
    <section className="w-full bg-gray-100 p-4 rounded-xl shadow-md" style={{ height: "470px" }}>
      <a href={platformLink} target="_blank" rel="noopener noreferrer">
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

