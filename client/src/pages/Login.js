import React from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

export const Login = (props) => {
	const context = React.useContext(AuthContext);
	const history = useNavigate();
	const [errors, setErrors] = React.useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: "",
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(proxy, result) {
			window.localStorage.setItem("user", result.data.login);
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

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div style={{ padding: "20px", maxWidth: "60%", margin: "auto" }}>
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>LOGIN</h1>
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
					label="Password"
					placeholder="Password..."
					type="password"
					name="password"
					value={values?.password}
					onChange={onChange}
					error={errors?.password ? true : false}
				/>

				<Button type="submit" primary>
					Login
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

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;
