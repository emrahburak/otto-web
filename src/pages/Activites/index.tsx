import ActiviteField from "../../components/ActiviteField";
import BreadCrumb from "../../components/BreadCrumb";
import { workshops } from "../../data/workshop";

export default function ActivitesPage() {
  return (
    <>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Aktiviteler" }
        ]}
      />

      <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-5">
        <ActiviteField cards={workshops} />
      </div>
    </>

  )
}

