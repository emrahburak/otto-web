import AboutField from "../../components/AboutField";
import BreadCrumb from "../../components/BreadCrumb";
import Team from "../../components/Team";
import { teamMembers } from "../../data/teamData";




export default function AboutPage() {
  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Hakkımızda" }
        ]}
      />
      <AboutField />
      <Team members={teamMembers}/>
    </div>
  )
}
