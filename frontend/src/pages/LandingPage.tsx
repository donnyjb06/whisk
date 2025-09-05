import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";

const LandingPage = () => {
	return (
		<div>
			<main className="overflow-hidden max-w-7xl mx-auto">
				<HeroSection />
				<FeaturesSection />
				<DemoSection />
			</main>
		</div>
	);
};

export default LandingPage;
