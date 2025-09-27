import type { ChildrenProps } from "@/types/ui";
import { AnimatePresence, motion } from "motion/react";

interface PageTransitionProps extends ChildrenProps {
	className?: string;
  pathName: string;
}

const PageTransition = ({ className, children, pathName }: PageTransitionProps) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathName}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9 }}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default PageTransition;
