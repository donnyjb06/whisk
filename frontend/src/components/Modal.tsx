import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ChildrenProps } from "@/types/ui";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";

interface ModalProps extends ChildrenProps {
	name: string;
	className?: string;
}

const Modal = ({ children, name, className }: ModalProps) => {
	const { modalIsOpen, setModalIsOpen } = useModal();

	const closeModal = useCallback(() => {
		setModalIsOpen("");
	}, [setModalIsOpen]);

	useEffect(() => {
		const handleClickOpen = (event: MouseEvent) => {
			const target = event.target as HTMLDivElement;
			if (!target) return;
			if (target.classList.contains("backdrop-blur-sm")) {
				closeModal();
			}
		};

		const handleEscapeClose = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeModal();
		};

		document.addEventListener("click", handleClickOpen);
		document.addEventListener("keydown", handleEscapeClose);

		return () => {
			document.removeEventListener("click", handleClickOpen);
			document.removeEventListener("keydown", handleEscapeClose);
		};
	}, [closeModal]);

	return (
		<AnimatePresence>
			{modalIsOpen === name && (
				<motion.div
					className="fixed w-screen h-screen flex backdrop-blur-xs z-50 items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.75, rotate: 90 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
						exit={{ opacity: 0, scale: 0.75, rotate: 90 }}
						layout
						className={cn(
							"relative p-8 max-w-7xl bg-background mx-auto rounded-2xl shadow-2xl flex",
							className
						)}
					>
						<motion.button
							initial={{ opacity: 1, scale: 1, rotate: 0 }}
							whileHover={{ scale: 1.1, rotate: 90 }}
							type="button"
							className="absolute top-2 right-2"
							onClick={() => closeModal()}
						>
							<X className="w-[1.5rem] h-[1.5rem] text-foreground" />
						</motion.button>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
