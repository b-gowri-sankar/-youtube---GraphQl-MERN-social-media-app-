import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuBar = () => {
	const [activeItem, setActiveItem] = React.useState("home");

	const handleItemClick = (e, { name }) => setActiveItem(name);

	React.useEffect(() => {
		const pathname = window.location.pathname;
		const path = pathname === "/" ? "home" : pathname.substr(1);
		setActiveItem(path);
	}, [window.location.pathname]);

	return (
		<Menu pointing secondary size="massive">
			<Menu.Item
				name="home"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
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
		</Menu>
	);
};

export default MenuBar;
