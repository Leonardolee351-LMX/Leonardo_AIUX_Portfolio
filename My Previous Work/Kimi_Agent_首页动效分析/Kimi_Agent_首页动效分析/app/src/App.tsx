import { ScrollVideoBackground3 } from "@/components/ScrollVideoBackground3";
import { Navigation3 } from "@/components/layout/Navigation3";
import { AboutSection3 } from "@/sections/v3/AboutSection3";
import { FooterSection3 } from "@/sections/v3/FooterSection3";
import { HeroSection3 } from "@/sections/v3/HeroSection3";
import { WorkSection3 } from "@/sections/v3/WorkSection3";

function App() {
  return (
    <div className="relative min-h-screen">
      <ScrollVideoBackground3 />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navigation3 />
        <HeroSection3 />
        <WorkSection3 />
        <AboutSection3 />
        <FooterSection3 />
      </div>
    </div>
  );
}

export default App;
