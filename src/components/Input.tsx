import React from "react";
import cx from "classnames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelClass?: string;
	className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...rest }, ref) => {
	const inputClassName = cx(
		"border-gray-200 border-solid border px-4 py-3 w-full rounded-lg  text-sm shadow-sm rounded bg-white px-3 py-1.5 text-xs text-dark font-normal outline-none border-0.25 border-light-border hover:border-dark focus:border-dark duration-200 ease-in-out",
		className
	);
	return <input className={inputClassName} ref={ref} {...rest} />;
});

export default Input;
