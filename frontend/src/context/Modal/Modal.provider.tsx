import type { ChildrenProps } from "@/types/ui";
import { ModalContext } from "./Modal.context";
import { useState } from "react";

const ModalProvider = ({ children }: ChildrenProps) => {
	const [modalIsOpen, setModalIsOpen] = useState<string>("");

	return (
		<ModalContext.Provider value={{ modalIsOpen, setModalIsOpen }}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
