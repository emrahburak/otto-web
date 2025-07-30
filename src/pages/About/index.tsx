import AboutField from "../../components/AboutField";
import BreadCrumb from "../../components/BreadCrumb";
import Team from "../../components/Team";
import { teamMembers } from "../../data/teamData";
import { aboutContent } from "../../data/content";

import aboutImg from "@/assets/otto-about.jpg";


export default function AboutPage() {
  return (
    <div>
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
