import React from "react";
import cx from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: React.FC<Props> = ({ className = "", children, ...rest }) => {
	const buttonClassName = cx(
		"flex flex-row items-center space-x-1.5 rounded-sm bg-primary hover:bg-primary-dark px-3 py-1.5 text-xs text-white duration-200 ease-in-out",
		className
	);
	return (
		<button className={buttonClassName} {...rest}>
			<span>{children}</span>
		</button>
	);
};

export default Button;
