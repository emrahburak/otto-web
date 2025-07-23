import { useParams } from "react-router-dom";
import slugify from "slugify";
import { workshops } from "../../data/workshop";
import BreadCrumb from "../../components/BreadCrumb";
import CardImage from "../../components/CardImage";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const service = workshops.find(item => {
    const itemSlug = slugify(item.title ?? "", { lower: true, locale: "tr" });
    return itemSlug === slug;
  });

  if (!service) {
    return <div>Etkinlik bulunamadı.</div>;
  }

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: service.title ?? "" }
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-10">

        <CardImage items={service} variant="banner" />
        <p>
          Dui cras natoque magna, malesuada, ornare consectetur dignissim sit justo placerat et. Vitae vivamus sem, amet amet finibus vestibulum varius, aenean nibh praesent nunc. Facilisis nunc mi, at lacus vel eleifend pulvinar lectus dictum lectus, felis. Euismod tempus aliquam nunc convallis tempor, pellentesque, porttitor euismod etiam diam velit. Auctor at, eu sed, tincidunt metus massa sed dis fringilla convallis sapien. Ligula praesent porta, efficitur magna enim, nunc pulvinar at laoreet dolor risus.

          Ac ullamcorper id, et euismod, non et praesent nulla nam pretium massa. Faucibus tincidunt lectus curabitur dui ligula convallis ac et, nunc non neque. Suspendisse pulvinar ac lacus ut vitae habitasse ut, et faucibus convallis id. Vivamus fusce facilisis, diam, ut varius pretium efficitur risus tristique praesent ac. Molestie, placerat maximus, dui molestie vestibulum est dui vitae tempor nulla leo. In duis praesent nunc, eleifend, integer ultricies sed ac lectus aliquet eget.
        </p>

      </div>
    </div>
  );
}

