// src/pages/Privacy/index.tsx
// Trust-anchor alias for /sayfa/gizlilik. Reuses the exact Gizlilik
// Politikası content without rewriting it.
import BreadCrumb from "../../components/BreadCrumb";
import { gizlilikPolitikasi } from "../../data/terms";
import { useSeo } from "../../lib/useSeo";

export default function PrivacyPage() {
  useSeo({
    title: `${gizlilikPolitikasi.title} – Otto Doğa Okulu`,
    description: gizlilikPolitikasi.description,
    ogType: "website",
  });

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Gizlilik Politikası" },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10 px-4 space-y-7">
        <h2 className="text-2xl font-semibold font-display text-center">
          {gizlilikPolitikasi.title}
        </h2>
        <div
          className="prose prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: gizlilikPolitikasi.content }}
        />
      </div>
    </div>
  );
}
