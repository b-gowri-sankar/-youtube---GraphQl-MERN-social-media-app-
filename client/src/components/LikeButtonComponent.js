import React from "react";
import { Icon, Label, Button, Popup } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

export const LikeButtonComponent = ({
	post: { id, likes, likeCount },
	user,
}) => {
	const [liked, setLiked] = React.useState(false);
	React.useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [likes, user]);

	const [likePost] = useMutation(LIKE_POST, {
		variables: { postId: id },
		onError(err) {
			console.log(err);
		},
	});

	const handleClick = () => {
		likePost();
	};

	const likeButton = user ? (
		liked ? (
			<Button color="teal" onClick={handleClick}>
				<Icon name="heart" />
			</Button>
		) : (
			<Button color="teal" basic onClick={handleClick}>
				<Icon name="heart" />
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="teal" basic>
			<Icon name="heart" />
		</Button>
	);

	return (
		<Popup
			content="Like a post"
			inverted
			trigger={
				<Button as="div" labelPosition="right">
					{likeButton}
					<Label basic color="teal" pointing="left">
						{likeCount}
					</Label>
				</Button>
			}
		/>
	);
};

const LIKE_POST = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;
