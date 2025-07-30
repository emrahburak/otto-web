import { useParams } from "react-router-dom";
import slugify from "slugify";
import { workshops } from "../../data/workshop";
import BreadCrumb from "../../components/BreadCrumb";

import { useEffect, useRef } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const service = workshops.find(item => {
    const itemSlug = slugify(item.title ?? "", { lower: true, locale: "tr" });
    return itemSlug === slug;
  });

  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]");
    return () => {
      NativeFancybox.unbind("[data-fancybox]");
    };
  }, [service?.images?.length]);

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
          {service.images && service.images.length > 0 ? (
            <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {service.images.map((img, idx) => (
                <a
                  key={idx}
                  data-fancybox="gallery"
                  href={img}
                >
                  <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={img}
                      alt={`Görsel ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </a>
              ))}
            </div>
          ) : (
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

