import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const onChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};
	return {
		onChange,
		onSubmit,
		values,
	};
};
