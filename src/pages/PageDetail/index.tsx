import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { footerItems } from "../../data/footerData";
import { pageData } from "../../data/pageData";
import { sayfaBulunamadi } from "../../data/404";

const allFooterLinks = footerItems.flatMap(group => group.links);

export default function PageDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // 1. Footer linkleri veya pageData içinde ara
  const foundLink = allFooterLinks.find(link => {
    const linkSlug = link.slug ?? link.link?.split("/").filter(Boolean).pop();
    return linkSlug === slug;
  });

  const foundContent = pageData.find(p => p.slug === slug);

  // 2. Eğer URL hatalıysa veya içerik yoksa yedekleri (fallback) devreye sok
  const pageLink = foundLink || { id: 404, name: "Sayfa Bulunamadı" };
  const content = foundContent || sayfaBulunamadi;

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: pageLink.name },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10 px-4 space-y-7">
        <h2 className="text-2xl font-semibold font-display text-center">
          {content.title}
        </h2>
        <div
          className="prose prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </div>
  );
}
