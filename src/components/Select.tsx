import React from "react"
import cx from "classnames"
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string | null
	loading?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ loading = false, label = "", className = "", children, ...rest }, ref) => {
		const selectClassName = cx(
			"disabled:cursor-not-allowed disabled:bg-secondary-light disabled:hover:border-secondary-light px-3 py-3.5 w-84 outline-none rounded-md border border-secondary-dark hover:border-black text-black placeholder:text-secondary-dark text-md transition ease-in-out",
			className,
		)
		return (
			<>
				{label && <label className="text-dark-alt">{label}</label>}
                    <select className={selectClassName} ref={ref} {...rest}>
                        {children}
                    </select>
			</>
		)
	},
)

export default Select