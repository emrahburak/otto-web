import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumb from "../../components/BreadCrumb";
import LocationField from "../../components/LocationField";
import { ContactData } from "../../data/contact";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import ContactField from "../../components/ContactField";



export default function ContactPage() {
  const contactData = ContactData

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "İletişim" }
        ]}
      />
      <section className="w-full max-w-6xl mx-auto py-5">
        <h1 className="text-center font-semibold font-display text-3xl">İLETİŞİME GEÇİN</h1>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-16">
          <div className="flex flex-col items-center justify-start gap-5">
            <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-orange-01" />
            <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Adres</p>
            <p className="font-display-02 text-gray-500  text-lg">
              {contactData.address}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start gap-5">
            <FontAwesomeIcon icon={faPhone} className="text-4xl text-orange-01 " />
            <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Telefon</p>
            <p className="font-display-02 text-gray-500 hover:text-orange-01 text-lg">
              {contactData.phone}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start gap-5">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-orange-01" />
            <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Mail</p>
            <p className="font-display-02 text-gray-500  text-lg">
              {contactData.mail}
            </p>

          </div>


        </div>
      </section>
      <section className="w-full    bg-gray-01">
        <div className="max-w-4xl mx-auto py-5 space-y-4">

        <h1 className="text-center font-semibold font-display text-3xl mb-4">Bize Sorunuz Var mı?</h1>

          <ContactField />

        </div>
      </section>
      <LocationField />
    </div>
  )
}

