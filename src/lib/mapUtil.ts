export function extractCoordinates(
  url: string,
): { lat: number; lng: number } | null {
  const googleMatch =
    url.match(/@([-.\d]+),([-.\d]+)/) || url.match(/q=([-.\d]+),([-.\d]+)/);
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

export function getPlatformMapLink(lat: number, lng: number): string {
  const userAgent = navigator.userAgent || navigator.vendor || "";
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isAndroid = /android/i.test(userAgent);

  if (isIOS) {
    return `https://maps.apple.com/?ll=${lat},${lng}`;
  } else if (isAndroid) {
    return `geo:${lat},${lng}?q=${lat},${lng}`;
  } else {
    return `https://maps.google.com/?q=${lat},${lng}`;
  }
}
