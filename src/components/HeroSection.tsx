import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/landing-hero-image.jpg";

export default function HeroSection() {
	return (
		<>
			<section className="bg-background">
				<div className="relative py-10 lg:py-36">
					<div className="relative z-10 w-full max-w-5xl px-6">
						<div className="md:w-1/2">
							<div>
								<h1 className="max-w-md text-balance heading1">
									Ingredients in. Recipes out.
								</h1>
								<p className="text-muted my-8 max-w-2xl text-balance text-xl">
									No more wasted food — enter what you’ve got, and get a meal
									plan in seconds.
								</p>

								<div className="flex items-center gap-3">
									<Button
										asChild
										size="lg"
										className="pr-4.5 buttontext text-primary-foreground"
									>
										<a href="#link">
											<span className="text-nowrap">Get Started</span>
											<ChevronRight className="opacity-50" />
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
						<div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
							<div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
								<img
									src={heroImage}
									alt="app screen"
									width="2880"
									height="1842"
									className="object-top-left size-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
