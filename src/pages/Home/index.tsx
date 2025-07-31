import { useMemo } from "react";
import AboutField from "../../components/AboutField";
import Carousel from "../../components/Carousel";
import LocationField from "../../components/LocationField";
import Slide from "../../components/Slide";
import { ContactData } from "../../data/contact";
import { aboutContent } from "../../data/content";
import { slides as originalSlides } from "../../data/slider";
import { workshops } from "../../data/workshop";
import { shuffleArray } from "../../lib/shuffle";
import aboutImg from "@/assets/images/comlek/otto-event-comlek-02.jpg";
import { useSeo } from "../../lib/useSeo";


export default function HomePage() {

  useSeo({
    title: "Ana Sayfa – Otto Doğa Okulu",
    description: "Çocuklar için doğa temelli öğrenme ve keşif olanakları sunan Otto Doğa Okulu’nun ana sayfası."
  });

  const slides = useMemo(() => shuffleArray(originalSlides),[])

  return (
    <div className="w-full ">
      <Slide slides={slides} />
      <AboutField content={aboutContent} aboutImg={aboutImg}/>
      <Carousel cards={workshops} />
      <LocationField mapUrl={ContactData.map} />
    </div>
  )
}

