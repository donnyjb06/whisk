import Modal from "./Modal";
import { Button } from "./ui/Button";
import { useUserData } from "@/hooks/useUserData";
import { useModal } from "@/hooks/useModal";

const LogOutConfirmationModal = () => {
	const { logOutUser } = useUserData();
	const { setModalIsOpen } = useModal();

	return (
		<Modal name="delete" className="flex flex-col items-center gap-6">
			<h5 className="heading6 max-w-[300px] text-center">Are you sure you want to log out?</h5>
			<div className="flex flex-col md:flex-row gap-2 self-stretch">
				<Button variant="default" onClick={logOutUser} className="grow">
					Logout
				</Button>
				<Button variant="outline" onClick={() => setModalIsOpen("")} className="grow">
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default LogOutConfirmationModal;
