import ActiviteField from "../../components/ActiviteField";
import BreadCrumb from "../../components/BreadCrumb";
import { workshops } from "../../data/workshop";
import { useSeo } from "../../lib/useSeo";

export default function ActivitesPage() {
  useSeo({
    title: "Aktiviteler – Otto Doğa Okulu",
    description: "Otto Doğa Okulu’nun doğa temelli, öğretici ve eğlenceli etkinlikleri hakkında bilgi alın."
  });
  return (
    <>
      <div className="space-y-8">
        <BreadCrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Aktiviteler" }
          ]}
        />

        <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  ">
          <ActiviteField cards={workshops} />
        </div>


      </div>
    </>

  )
}

