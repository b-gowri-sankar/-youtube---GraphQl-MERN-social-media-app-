import React from "react";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { LikeButtonComponent } from "../components/LikeButtonComponent";
import { DeleteButton } from "./DeleteButton";
export const PostCard = ({ post }) => {
	const { body, createdAt, id, username, likeCount, commentCount, likes } =
		post;
	const { user } = React.useContext(AuthContext);
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButtonComponent user={user} post={{ id, likeCount, likes }} />
				<Button
					as="div"
					labelPosition="right"
					// style={{ marginTop: "10px" }}
					as={Link}
					to={`/posts/${id}`}
				>
					<Button color="blue" basic>
						<Icon name="comments" />
					</Button>
					<Label basic color="blue" pointing="left">
						{commentCount}
					</Label>
				</Button>
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
};
