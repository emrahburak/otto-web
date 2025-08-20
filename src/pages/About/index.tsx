import AboutField from "../../components/AboutField";
import BreadCrumb from "../../components/BreadCrumb";
import Team from "../../components/Team";
import { teamMembers } from "../../data/teamData";
import { aboutContent } from "../../data/content";

import aboutImg from "@/assets/otto-about.jpg";
import { useSeo } from "../../lib/useSeo";


export default function AboutPage() {
  useSeo({
    title: "Hakkımızda – Otto Doğa Okulu",
    description: "İstanbul Pendik’teki Otto Doğa Okulu’nun doğayla iç içe, çocuklara özel eğitim programları ve uzman kadrosu hakkında bilgi alın."
  });

  return (
    <div className="space-y-8">
      <BreadCrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Hakkımızda" }
        ]}
      />
      <AboutField content={aboutContent} aboutImg={aboutImg} />
      <Team members={teamMembers} />
    </div>
  )
}
