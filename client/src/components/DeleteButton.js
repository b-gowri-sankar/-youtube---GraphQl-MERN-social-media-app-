import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphQl";

export const DeleteButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = React.useState(false);

	const [deletePost] = useMutation(DELETE_POST, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			const newData = data.getPosts.filter((p) => p.id !== postId);
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					...data,
					getPosts: newData,
				},
			});
			if (callback) {
				callback();
			}
			//TODO: remove post from cache
		},
		variables: {
			postId,
		},
	});

	return (
		<React.Fragment>
			<Button
				as="div"
				color="red"
				floated="right"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePost}
			/>
		</React.Fragment>
	);
};

const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;
