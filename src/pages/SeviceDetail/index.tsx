import { useParams } from "react-router-dom";
import slugify from "slugify";
import { workshops } from "../../data/workshop";
import BreadCrumb from "../../components/BreadCrumb";

import { useEffect, useRef, useState } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "./style.css"


export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const service = workshops.find(item => {
    const itemSlug = slugify(item.title ?? "", { lower: true, locale: "tr" });
    return itemSlug === slug;
  });

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  useEffect(() => {
    if (!service?.images) return;
    const loaders = service.images as (() => Promise<string>)[];
    let isMounted = true;

    Promise.all(loaders.map(loader => loader() as Promise<string>))
      .then(images => {
        if (isMounted) setLoadedImages(images)
      })
    return () => { isMounted = false; }
  }, [service?.images])


  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]");
    return () => {
      NativeFancybox.unbind("[data-fancybox]");
    };
  }, [loadedImages]);

  if (!service) {
    return <div>Etkinlik bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: service.title ?? "" },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto space-y-8 px-4">
        <h1 className="text-3xl font-bold  text-center font-display">{service.title}</h1>

        <div className="w-full">
          {loadedImages.length > 0 ? (
            <div
              ref={galleryRef}
              className={`grid gap-4 grid-cols-2 ${loadedImages.length % 4 === 0
                ? 'md:grid-cols-4'
                : loadedImages.length % 3 === 0
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2'
                }`}
            >
              {loadedImages.map((img, idx) => {
                const webpSrc = img.replace(/\.(jpg|jpeg|png)$/i, ".webp");
                return (
                  <a key={idx} data-fancybox="gallery" href={webpSrc}>
                    <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-md">
                      <picture>
                        <source srcSet={webpSrc} type="image/webp" />
                        <img
                          src={img}
                          alt={`Görsel ${idx + 1}`}
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-cover blur`}
                          onLoad={(e) => e.currentTarget.classList.add('loaded')}
                        />
                      </picture>
                    </div>
                  </a>
                );
              })}
            </div>) : (
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
              Görsel yok
            </div>
          )}

        </div>

        {service.content ? (
          <div className="w-full h-fit font-display-02 text-gray-500 text-center" dangerouslySetInnerHTML={{ __html: service.content }} />
        ) : (
          <p></p>
        )}

      </div>
    </div>
  );
}

