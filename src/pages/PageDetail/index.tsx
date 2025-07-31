import { useParams } from "react-router-dom";
import slugify from "slugify";
import BreadCrumb from "../../components/BreadCrumb";
import { footerItems } from "../../data/footerData";

const allFooterLinks = footerItems.flatMap(group => group.links);

export default function PageDetailPage() {
  const { slug } = useParams<{ slug: string }>();


  const page = allFooterLinks.find(link => {
    return (link.slug || slugify(link.name ?? "", { lower: true, locale: "tr" })) === slug;
  });


  if (!page) {
    return <div>Sayfa bulunamadı.</div>;
  }

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: page.name }
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10">
        <p>
          Bu sayfa "{page.name}" başlığını içermektedir. Detay içerik daha sonra girilecektir.
        </p>
      </div>
    </div>
  );
}

