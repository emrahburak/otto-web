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

    // Throttle için yardımcı
    let throttleTimeout: NodeJS.Timeout | null = null;
    const throttle = (fn: () => void, wait = 200) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        fn();
        throttleTimeout = null;
      }, wait);
    };

    const loadAndSetImages = async () => {
      const loaded = await Promise.all(loaders.map(loader => loader() as Promise<string>));

      // Tekil URL’ler ve geçerli webp dosyaları
      const uniqueImages = Array.from(new Set(loaded))
        .filter(img => img.endsWith(".webp"));

      // Mobil kontrolü
      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      // Final images
      const finalImages = uniqueImages
        .map(img => {
          const webpSrc = img.replace(/\.(jpg|jpeg|png)$/i, ".webp");
          return isMobile
            ? webpSrc.includes("-sm.webp") ? webpSrc : webpSrc.replace(".webp", "-sm.webp")
            : webpSrc.replace("-sm.webp", ".webp");
        })
        .filter((v, i, a) => a.indexOf(v) === i); // Son duplicate temizleme

      if (isMounted) setLoadedImages(finalImages);
    };

    loadAndSetImages();

    const resizeListener = () => throttle(loadAndSetImages, 200);
    window.addEventListener("resize", resizeListener);

    return () => {
      isMounted = false;
      if (throttleTimeout) clearTimeout(throttleTimeout);
      window.removeEventListener("resize", resizeListener);
    };
  }, [service?.images]);


  useEffect(() => {
    if (loadedImages.length === 0) return;

    // Önce eski bindingleri temizle
    NativeFancybox.unbind("[data-fancybox]");

    // Yeni galeriyi bind et
    NativeFancybox.bind("[data-fancybox]", {
      // opsiyonlar burada
      groupAttr: "data-fancybox",
    });

    // Cleanup
    return () => {
      NativeFancybox.unbind("[data-fancybox]");
    };
  }, [loadedImages]);

  if (!service) {
    return <div>Etkinlik bulunamadı.</div>;
  }

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: service.title ?? "" },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10 space-y-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">{service.title}</h1>

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
                // Örnek: image.webp → image-sm.webp
                return (
                  <a key={idx} data-fancybox="gallery" href={img}>
                    <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-md">
                      <picture>
                        <source srcSet={img} type="image/webp" />
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

