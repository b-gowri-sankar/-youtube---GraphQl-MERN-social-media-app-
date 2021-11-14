import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphQl";
import { useForm } from "../utils/hooks";

export const PostForm = () => {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: "",
	});
	const [createPost, { error }] = useMutation(CREATE_POST, {
		variables: values,
		update(proxy, result) {
			const tempData = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			let data = [...tempData.getPosts];
			data = [result.data.createPost, ...data];
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					...tempData,
					getPosts: {
						data,
					},
				},
			});
			values.body = "";
		},
		onError(err) {
			console.log(err);
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<React.Fragment>
			<Form onSubmit={onSubmit}>
				<h2>Create a Post:</h2>
				<Form.Field>
					<Form.Input
						placeholder="Hi world!"
						name="body"
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Button type="submit" color="teal">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className="ui error message">
					<ul className="list">
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</React.Fragment>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;
