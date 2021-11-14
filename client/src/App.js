import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import { SinglePost } from "./pages/SinglePost.js";

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<Container>
					<MenuBar />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/posts/:postId" element={<SinglePost />} />

						<Route path="/" element={<AuthRoute />}>
							<Route path="/login" element={<Login />} />
							<Route exact path="/register" element={<Register />} />
						</Route>
					</Routes>
				</Container>
			</AuthProvider>
		</Router>
	);
};

export default App;
