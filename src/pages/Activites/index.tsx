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
      <ActiviteField cards={workshops} />
    </>

  )
}

