import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/useModal";
import { useUserData } from "@/hooks/useUserData";
import { Label } from "@radix-ui/react-label";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

const EditProfileForm = () => {
	const { currentUser, editProfile } = useUserData();
	const { setModalIsOpen } = useModal();
	const [formValues, setFormValues] = useState<{
		name: string;
		email: string;
	}>({ name: currentUser?.name ?? "", email: currentUser?.email ?? "" });
	const [loading, setLoading] = useState<boolean>(false);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			const user = editProfile(formValues);
			if (!user) {
				toast.error(
					"An error has occured when attempting to edit your profile"
				);
				return;
			}

			toast.success("Profile has been updated");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				return;
			}

			toast.error("An unknown error has occured");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="self-stretch grow">
			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<fieldset className="flex flex-col gap-2">
					<Label className="flex buttontext flex-col items-stretch gap-1">
						Name
						<Input
							value={formValues.name}
							maxLength={100}
							minLength={2}
							onChange={handleInputChange}
							name="name"
						/>
					</Label>
					<Label className="flex buttontext flex-col items-stretch gap-1">
						Email Address
						<Input
							value={formValues.email}
							minLength={3}
							maxLength={320}
							onChange={handleInputChange}
							name="email"
							type="email"
						/>
					</Label>
				</fieldset>
				<Button variant="default" disabled={loading}>
					Edit Profile
				</Button>
				<Button
					onClick={() => setModalIsOpen("delete")}
					type="button"
					variant="destructive"
				>
					Log out
				</Button>
			</form>
		</div>
	);
};

export default EditProfileForm;
