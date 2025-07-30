import AboutField from "../../components/AboutField";
import Carousel from "../../components/Carousel";
import LocationField from "../../components/LocationField";
import Slide from "../../components/Slide";
import { ContactData } from "../../data/contact";
import { aboutContent } from "../../data/content";
import { slides } from "../../data/slider";
import { workshops } from "../../data/workshop";
import aboutImg from "@/assets/images/comlek/otto-event-comlek-02.jpg";


export default function HomePage() {

  return (
    <div className="w-full ">
      <Slide slides={slides} />
      <AboutField content={aboutContent} aboutImg={aboutImg}/>
      <Carousel cards={workshops} />
      <LocationField mapUrl={ContactData.map} />
    </div>
  )
}

