import BreadCrumb from "../../components/BreadCrumb";
import LocationField from "../../components/LocationField";

export default function ContactPage() {
  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "İletişim" }
        ]}
      />
      <LocationField/>
    </div>
  )
}

