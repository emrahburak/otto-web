import AboutField from "../../components/AboutField";
import Carousel from "../../components/Carousel";
import LocationField from "../../components/LocationField";
import Slide from "../../components/Slide";
import { ContactData } from "../../data/contact";
import { slides } from "../../data/SliderContent";
// import { workshops } from "../../data/workshop";
import { getContents} from "../../lib/useContents";



export default function HomePage() {

  const contents = getContents('aktivite');
  console.log(contents);
  return (
    <div className="w-full ">
      <Slide slides={slides} />
      <AboutField />
      <Carousel cards={contents} />
      <LocationField mapUrl={ContactData.map} />
    </div>
  )
}

