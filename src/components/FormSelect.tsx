import React, { useEffect } from "react"
import { FieldPath, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import Select, { SelectProps } from "./Select"

interface SelectOptions {
	label: string
	value: string
}

interface Props<T extends FieldValues> extends SelectProps {
	register: UseFormRegister<any>
	errors?: any
	options: SelectOptions[]
	containerClass?: string
	defaultValue?: string
	name: FieldPath<T>
	setValue?: UseFormSetValue<T>
}

const FormSelect = <T extends FieldValues>({
	register,
	errors = {},
	containerClass,
	name,
	options,
	setValue,
	defaultValue,
	...rest
}: Props<T>) => {

	useEffect(() => {
		if (setValue && defaultValue) {
			setValue(name, defaultValue as any, { shouldDirty: true })
		}
	}, [])

	return (
		<div className={`flex flex-col ${containerClass}`}>
			<Select {...register(name)} {...rest}>
				{options.map(({ label, value }: SelectOptions) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</Select>
			{errors[name] && <p className="mt-1 ml-1 text-sm text-danger">{errors[name]?.message}</p>}
		</div>
	)
}

export default FormSelect