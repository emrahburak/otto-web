import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumb from "../../components/BreadCrumb";
import LocationField from "../../components/LocationField";
import { ContactData } from "../../data/contact";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { extractCoordinates, getPlatformMapLink } from "../../lib/mapUtil";
import { Button } from "../../ui/Button";



export default function ContactPage() {
  const contactData = ContactData

  const mapUrl = contactData.map
  const location = extractCoordinates(mapUrl)



  const handleClick = () => {
    if (!location) return;
    const link = getPlatformMapLink(location.lat, location.lng)

    window.open(link, "_blank")
  }



  // const scrollToLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   const el = document.getElementById("location-section");
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };


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


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 py-16">

          <div className="flex flex-col items-center justify-start gap-1">
            <a href={`tel:${contactData.phone}`} className="text-orange-01 text-4xl">
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Telefon</p>
            <p className="font-display-02 text-gray-500 hover:text-orange-01 text-lg text-center">
              {contactData.phone}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start gap-1">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-orange-01" />
            <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Mail</p>
            <p className="font-display-02 text-gray-500  text-lg text-center">
              {contactData.mail}
            </p>

          </div>

          <div className="flex flex-col items-center justify-start gap-1">
            <Button className="hover:text-orange-01 transition cursor-pointer" onClick={handleClick}>
              <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-orange-01" />
              <p className="font-display text-2xl hover:text-orange-01 transition-all duration-300 ease-in-out">Adres</p>

            </Button>
            <p className="font-display-02 text-gray-500  text-lg text-center">
              {contactData.address}
            </p>
          </div>

        </div>
      </section>
      <div id="location-section" className="pt-4">
        <LocationField mapUrl={ContactData.map} />
      </div>
    </div>
  )
}

