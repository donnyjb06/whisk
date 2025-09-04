import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

const LandingPage = () => {
	return (
		<div>
			<main className="overflow-hidden max-w-7xl mx-auto">
				<HeroSection />
				<FeaturesSection />
			</main>
		</div>
	);
};

export default LandingPage;
