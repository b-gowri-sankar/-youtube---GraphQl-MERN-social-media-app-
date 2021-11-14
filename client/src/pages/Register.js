import React from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hooks";

export const Register = (props) => {
	const history = useNavigate();
	const [errors, setErrors] = React.useState({});

	const initilaState = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const { onChange, onSubmit, values } = useForm(registerUser, initilaState);

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			console.log("it is executing", props);
			history("/");
		},
		onError(err) {
			if (err.graphQLErrors.length > 0) {
				setErrors(err.graphQLErrors[0]?.extensions?.errors);
			} else {
				setErrors({});
			}
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return (
		<div style={{ padding: "20px", maxWidth: "60%", margin: "auto" }}>
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					type="text"
					value={values?.username}
					onChange={onChange}
					error={errors?.username ? true : false}
				/>
				<Form.Input
					label="Email"
					placeholder="Email..."
					name="email"
					type="email"
					value={values?.email}
					onChange={onChange}
					error={errors?.email ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password..."
					type="password"
					name="password"
					value={values?.password}
					onChange={onChange}
					error={errors?.password ? true : false}
				/>
				<Form.Input
					label="Confirm Password"
					placeholder="Re Enter Password..."
					type="password"
					name="confirmPassword"
					value={values?.confirmPassword}
					onChange={onChange}
					error={errors?.confirmPassword ? true : false}
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;
