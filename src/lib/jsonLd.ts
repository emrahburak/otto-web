// src/lib/jsonLd.ts
// Builds a complete schema.org Organization object from existing site data.
// Pure helper so it can be unit-tested and reused by the pre-render step.

export interface OrganizationAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface OrganizationJsonLd {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  address: { "@type": "PostalAddress" } & OrganizationAddress;
  geo: {
    "@type": "GeoCoordinates";
    latitude: string;
    longitude: string;
  };
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    email: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  parentOrganization: {
    "@type": "Organization";
    name: string;
  };
}

export const ORGANIZATION_DATA: OrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Otto Doğa Okulu",
  description:
    "İstanbul Pendik'te OttodoğaPark içinde yer alan Otto Doğa Okulu; okul gezileri, yaz okulu, şirket motivasyon etkinlikleri ve doğum günü organizasyonları sunan, çocuklara yönelik atölye odaklı bütüncül bir orman okulu sistemidir.",
  url: "https://www.ottodogaokulu.com/",
  logo: "https://www.ottodogaokulu.com/og-image.jpeg",
  image: "https://www.ottodogaokulu.com/og-image.jpeg",
  telephone: "+905010144386",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kurna Mah. Kurtdoğmuş Yolu Cad. No: 63/1",
    addressLocality: "Pendik",
    addressRegion: "İstanbul",
    postalCode: "34916",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.964004",
    longitude: "29.376206",
  },
  sameAs: [
    "https://www.instagram.com/ottodogaokulu",
    "https://www.facebook.com/ottodogaokulu",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905010144386",
    email: "info@ottodogapark.com",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["tr"],
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Otto Doğa Park",
  },
};

export function buildOrganizationJsonLd(): string {
  return JSON.stringify(ORGANIZATION_DATA);
}

export function organizationJsonLdScriptTag(): string {
  return `<script type="application/ld+json">${buildOrganizationJsonLd()}</script>`;
}
