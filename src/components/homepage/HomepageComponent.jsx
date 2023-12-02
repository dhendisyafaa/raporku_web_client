import FeatureComponent from "./FeatureComponent";
import FooterComponent from "./FooterComponent";
import HeroComponent from "./HeroComponent";
import HowToComponent from "./HowToComponent";
import MarginLayout from "./MarginLayout";
import NavbarComponent from "./NavbarComponent";
import PartnerComponent from "./PartnerComponent";

const HomepageComponent = () => {
  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-b from-white to-primary/10 h-fit md:min-h-screen">
        <div className="fixed top-0 w-full z-100">
          <NavbarComponent />
        </div>
        <HeroComponent />
      </div>
      <MarginLayout>
        <div className="space-y-6">
          <FeatureComponent />
          <HowToComponent />
          <PartnerComponent />
        </div>
      </MarginLayout>
      <div className="bg-gradient-to-b from-white to-primary/10">
        <FooterComponent />
      </div>
    </div>
  );
};

export default HomepageComponent;
