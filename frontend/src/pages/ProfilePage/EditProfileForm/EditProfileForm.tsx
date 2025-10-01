import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/hooks/useUserData";
import { Label } from "@radix-ui/react-label";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const EditProfileForm = () => {
	const { currentUser } = useUserData();

	const [formValues, setFormValues] = useState<{
		name: string;
		email: string;
	}>({ name: currentUser?.name ?? "", email: currentUser?.email ?? "" });
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			setFormValues({ name: "", email: "" });
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
						<Input value={formValues.name} />
					</Label>
					<Label className="flex buttontext flex-col items-stretch gap-1">
						Email Address
						<Input value={formValues.email} />
					</Label>
				</fieldset>
				<Button variant="default" disabled={loading}>
					Edit Profile
				</Button>
			</form>
		</div>
	);
};

export default EditProfileForm;
