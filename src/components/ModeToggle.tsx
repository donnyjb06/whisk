import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string
}

export function ModeToggle({className}: ModeToggleProps) {
	const { toggleTheme } = useTheme();
	return (
		<Button variant="outline" size="icon" onClick={toggleTheme} className={cn( "absolute bottom-4 right-4 lg:bottom-auto lg:right-auto lg:relative z-10 bg-background hover:bg-background/80 dark:bg-background dark:hover:bg-background/80", className) }>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 text-foreground rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] text-foreground w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button>
	);
}

export default ModeToggle;
