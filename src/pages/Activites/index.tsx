import BreadCrumb from "../../components/BreadCrumb";

export default function ActivitesPage() {
  return (
    <>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Aktiviteler" }
        ]}
      />

    </>

  )
}

