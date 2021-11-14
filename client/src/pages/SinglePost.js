import React from "react";
import { gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
	Card,
	Grid,
	Image,
	Label,
	Button,
	Icon,
	Form,
} from "semantic-ui-react";
import moment from "moment";
import { LikeButtonComponent } from "../components/LikeButtonComponent";
import { AuthContext } from "../context/auth";
import { DeleteButton } from "../components/DeleteButton";

export const SinglePost = (props) => {
	const navigate = useNavigate();
	const [comment, setComment] = React.useState("");
	const { user } = React.useContext(AuthContext);
	const { postId } = useParams();
	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	const commentInputRef = React.useRef();

	const deletePostCallback = () => {
		navigate("/");
	};

	const [createComment] = useMutation(CREATE_COMMENT, {
		update() {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
		onError(err) {
			console.log(err);
		},
	});

	let postMarkup;
	if (!data?.getPost) {
		postMarkup = <p>Loading post ...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = data?.getPost;
		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							floated="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButtonComponent
									user={user}
									post={{ id, likeCount, likes }}
								/>

								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log("comment on the post")}
								>
									<Button basic color="blue">
										<Icon name="comments" />
									</Button>
									<Label basic color="blue" pointing="left">
										{commentCount}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<Form>
										<div className="ui action input fluid">
											<input
												type="text"
												placeholder="comment .."
												name="comment"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												ref={commentInputRef}
											/>
											<button
												type="submit"
												className="ui button teal"
												disabled={comment.trim() === ""}
												onClick={createComment}
											>
												Submit{" "}
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
};

const CREATE_COMMENT = gql`
	mutation createComment($postId: String!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;

const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;
