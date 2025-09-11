import { ModalContext } from "@/context/Modal/Modal.context";
import { useContext } from "react";

export const useModal = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("useModal must be used within a ModalProvider component");
	}

	return context;
};
