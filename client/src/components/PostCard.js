import React from "react";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
	const { body, createdAt, id, username, likeCount, commentCount, likes } =
		post;
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
				<Button as="div" labelPosition="right">
					<Button color="teal">
						<Icon name="heart" />
						Like
					</Button>
					<Label basic color="teal" pointing="left">
						{likeCount}
					</Label>
				</Button>

				<Button as="div" labelPosition="right" style={{ marginTop: "10px" }}>
					<Button color="blue" basic>
						<Icon name="comments" />
						Comments
					</Button>
					<Label basic color="blue" pointing="left">
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};
