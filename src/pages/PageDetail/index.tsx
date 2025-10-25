import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { footerItems } from "../../data/footerData";
import { pageData } from "../../data/pageData";

const allFooterLinks = footerItems.flatMap(group => group.links);

export default function PageDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const pageLink = allFooterLinks.find(link => {
    const linkSlug = link.slug ?? link.link?.split("/").filter(Boolean).pop();
    return linkSlug === slug;
  });

  const content = pageData.find(p => p.slug === slug);

  if (!pageLink) {
    return <div>Sayfa bulunamadı.</div>;
  }

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: pageLink.name },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10 px-4  space-y-7">
        {content ? (
          <>
            <h2 className="text-2xl font-semibold  font-display text-center">
              {content.title}
            </h2>
            <div
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </>
        ) : (
          <p>Bu sayfanın içeriği henüz eklenmedi.</p>
        )}
      </div>
    </div>
  );
}

