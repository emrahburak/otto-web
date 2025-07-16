import AboutField from "../../components/AboutField";
import Carousel from "../../components/Carousel";
import Slide from "../../components/Slide";
import { slides } from "../../data/SliderContent";
import { workshops } from "../../data/workshop";


export default function HomePage() {
  return (
    <div >
      <Slide slides={slides}/>
      <AboutField/>
      <Carousel cards={workshops}/>
    </div>
  )
}

