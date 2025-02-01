import FeaturesSection from "@/components/features-section";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <div>
       <Navbar/>
      <LandingPage/>
      <FeaturesSection/>
      <Workflow/>
      <Footer/>
    </div>
  );
}
