import { useState, type ChangeEvent } from "react";
import Modal from "./Modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";

const AuthModal = () => {
	const [formValues, setFormValues] = useState<{
		name?: string;
		email: string;
		password: string;
	}>({ name: "", email: "", password: "" });

	const [type, setType] = useState<"login" | "register">("login");
	const isLoginModal = type === "login";

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

	return (
		<Modal name="auth" className="flex-col items-start gap-6">
			<h2 className="heading2">{type === "login" ? "Login" : "Register"}</h2>
			<form className="flex flex-col gap-4 self-stretch">
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
				<Button>{isLoginModal ? "Login" : "Register"}</Button>
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
