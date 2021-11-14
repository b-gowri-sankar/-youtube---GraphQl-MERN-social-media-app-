import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import { load } from "dotenv";
import { PostCard } from "../components/PostCard";

export const Home = () => {
	const {
		loading,
		data: { getPosts: posts },
	} = useQuery(FETCH_POSTS_QUERY);

	return (
		<Grid columns={3}>
			<Grid.Row className="ui container">
				<Grid.Column>
					<h1>Recent Posts</h1>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<h1>Loding Posts...</h1>
				) : (
					posts &&
					posts.map((post) => (
						<Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
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
