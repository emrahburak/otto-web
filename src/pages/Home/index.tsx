import AboutField from "../../components/AboutField";
import Carousel from "../../components/Carousel";
import LocationField from "../../components/LocationField";
import Slide from "../../components/Slide";
import { slides } from "../../data/SliderContent";
import { workshops } from "../../data/workshop";


export default function HomePage() {
  return (
    <div className="w-full">
      <Slide slides={slides} />
      <AboutField />
      <Carousel cards={workshops} />
      <LocationField />
    </div>
  )
}

