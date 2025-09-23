import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "./Modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModal";

const AuthModal = () => {
	const [formValues, setFormValues] = useState<{
		name: string;
		email: string;
		password: string;
	}>({ name: "", email: "", password: "" });

	const [type, setType] = useState<"login" | "register">("login");
	const isLoginModal = type === "login";
	const [loading, setLoading] = useState<boolean>(false);
	const { setModalIsOpen } = useModal();
	const { loginUser, registerUser } = useUserData();

	const switchModalType = () => {
		setType((prevType) => (prevType === "login" ? "register" : "login"));
	};

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
			const { name, email, password } = formValues;
			if (isLoginModal) {
				if (!email || !password) {
					toast.error("Missing values. Please fill out entire form");
					return;
				}

				const user = loginUser({ email, password });

				if (!user) {
					console.error("No user was returned when attempting to login user");
					toast.error(
						"An error has occured when attempting to login user. Please try again."
					);
				}
			} else {
				if (!name || !email || !password) {
					toast.error("Missing values. Please fill out entire form");
				}
				const user = registerUser(formValues);
				if (!user) {
					console.error(
						"No user was returned when attempting to register user"
					);
					toast.error(
						"An error has occured when attempting to register user. Please try again."
					);
				}
			}

			setModalIsOpen("");
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				toast.error(error.message);
				return;
			}

			console.error("An unknown error has occured", error);
			toast.error("An unknown error has occured. Please try again!");
		} finally {
			setLoading(false)
		}
	};

	return (
		<Modal name="auth" className="flex-col items-start gap-6">
			<h2 className="heading2">{type === "login" ? "Login" : "Register"}</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 self-stretch"
			>
				{type === "login" ? (
					<>
						<Label className="formlabel items-start">
							Email Address
							<Input
								type="text"
								name="email"
								placeholder="Enter your email"
								value={formValues.email}
								onChange={handleInputChange}
							/>
						</Label>
						<Label className="formlabel items-start">
							Password
							<Input
								value={formValues.password}
								onChange={handleInputChange}
								type="password"
								name="password"
								placeholder="Enter your password"
							/>
						</Label>
					</>
				) : (
					<>
						<Label className="formlabel items-start">
							Name
							<Input
								type="text"
								placeholder="Enter your name"
								name="name"
								onChange={handleInputChange}
								value={formValues.name}
							/>
						</Label>
						<Label className="formlabel items-start">
							Email Address
							<Input
								type="text"
								onChange={handleInputChange}
								placeholder="Enter your email"
								value={formValues.email}
								name="email"
							/>
						</Label>
						<Label className="formlabel items-start">
							Password
							<Input
								type="password"
								placeholder="Enter your password"
								name="password"
								onChange={handleInputChange}
								value={formValues.password}
							/>
						</Label>
					</>
				)}
				<Button disabled={loading}>
					{isLoginModal ? "Login" : "Register"}
				</Button>
			</form>
			<p className="buttontext flex gap-1 text-muted">
				{type === "login"
					? "Don't have an account?"
					: "Already have an account?"}
				<button
					className="buttontext cursor-pointer text-foreground underline underline-offset-3 hover:text-primary duration-200"
					onClick={switchModalType}
				>
					{isLoginModal ? "Create an account" : "Login"}
				</button>
			</p>
		</Modal>
	);
};

export default AuthModal;
