import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {FaSun, FaMoon} from "react-icons/fa";

interface ModeToggleProps {
	className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
	const { toggleTheme } = useTheme();
	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			className={cn(
				"fixed bottom-6 right-6 lg:bottom-auto lg:right-auto lg:relative z-10 bg-background hover:bg-background/80 dark:bg-background dark:hover:bg-background/80",
				className
			)}
		>
			<FaSun className="h-[1.2rem] w-[1.2rem] scale-100 text-foreground rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
			<FaMoon className="absolute h-[1.2rem] w-[1.2rem] text-foreground scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button>
	);
}

export default ModeToggle;
