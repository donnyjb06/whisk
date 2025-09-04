import { Card } from "@/components/ui/card";
import featureOne from "@/assets/feature-1.png";
import featureTwo from "@/assets/feature-2.png";
import featureThree from "@/assets/feature-3.png"

export default function FeaturesSection() {
	return (
		<section>
			<div className="py-10 lg:pb-24">
				<div className="mx-auto max-w-7xl px-6">
					<div>
						<h2 className="text-foreground heading2">
							Smart Recipes, Built Around You
						</h2>
						<p className="text-muted mb-12 mt-4 text-balance bodytext">
							Turn everyday ingredients into meals you’ll love. AI adapts to
							your pantry, your time, and your taste—so cooking always fits your
							life.
						</p>
					</div>
					<div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
						<div className="space-y-4">
							<Card className="aspect-video overflow-hidden px-6 bg-accent">
								<Card className="h-full translate-y-6 py-0 overflow-hidden">
									<img src={featureOne} className="object-center size-full object-cover" />
								</Card>
							</Card>
							<div className="sm:max-w-sm">
								<h3 className="text-foreground heading3">
									Cook With What You Have
								</h3>
								<p className="text-muted my-4 bodytext">
									Enter the ingredients you own and get instant recipes. No
									waste, no stress—just smart meals made simple.
								</p>
							</div>
						</div>
						<div className="space-y-4">
							<Card className="aspect-video overflow-hidden p-6 bg-accent">
								<Card className="h-full overflow-hidden py-0">
									<img src={featureTwo} className="size-full object-cover"/>
								</Card>
							</Card>
							<div className="sm:max-w-sm">
								<h3 className="text-foreground heading3">
									Choose Your Challenge
								</h3>
								<p className="text-muted my-4 bodytext">
									Pick your difficulty: easy, medium, or advanced. From quick
									bites to gourmet plates, you decide the effort.
								</p>
							</div>
						</div>
						<div className="space-y-4">
							<Card className="aspect-video overflow-hidden bg-accent">
								<Card className="translate-6 h-full py-0 overflow-hidden">
                                    <img src={featureThree} className="size-full object-cover object-top" />
                                </Card>
							</Card>
							<div className="sm:max-w-sm">
								<h3 className="text-foreground heading3">
									Your Pantry, Your Way
								</h3>
								<p className="text-muted my-4 bodytext">
									Save your pantry online and update it anytime. Select what to
									use—or let AI add common essentials for extra flavor.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
