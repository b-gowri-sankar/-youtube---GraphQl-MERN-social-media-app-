import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
	const [activeItem, setActiveItem] = React.useState("home");

	const { user, logout } = React.useContext(AuthContext);

	const handleItemClick = (e, { name }) => {
		if (name === "logout") {
			window.localStorage.removeItem("user");
		}
		setActiveItem(name);
	};

	React.useEffect(() => {
		const pathname = window.location.pathname;
		const path = pathname === "/" ? "home" : pathname.substr(1);
		setActiveItem(path);
	}, [window.location.pathname]);

	const menuBar = user ? (
		<Menu pointing secondary size="massive">
			<Menu.Item name={user.username} active as={Link} to="/" />
			{!window.localStorage.getItem("user") ? (
				<Menu.Menu position="right">
					<Menu.Item name="logout" onClick={logout} />
				</Menu.Menu>
			) : (
				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active={activeItem === "logout"}
						onClick={handleItemClick}
					/>
				</Menu.Menu>
			)}
		</Menu>
	) : (
		<Menu pointing secondary size="massive">
			<Menu.Item
				name="home"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
			{!window.localStorage.getItem("user") ? (
				<Menu.Menu position="right">
					<Menu.Item
						name="login"
						active={activeItem === "login"}
						onClick={handleItemClick}
						as={Link}
						to="/login"
					/>
					<Menu.Item
						name="register"
						active={activeItem === "register"}
						onClick={handleItemClick}
						as={Link}
						to="/register"
					/>
				</Menu.Menu>
			) : (
				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active={activeItem === "logout"}
						onClick={handleItemClick}
					/>
				</Menu.Menu>
			)}
		</Menu>
	);

	return menuBar;
};

export default MenuBar;
