import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema: Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			min: 2,
			max: 50,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			validator: {
				validator: (v: string) => validator.isEmail(v),
				message: "You must provide a valid email address",
			},
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
	},
	{
		statics: {
			async findUserByCredentials(email: string, password: string) {
				const user = this.findOne({ email }).select("+password");
				return user;
			},
		},
	}
);

export default mongoose.model("User", userSchema);
