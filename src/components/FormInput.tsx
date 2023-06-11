import { FieldValues, FieldPath, useFormContext } from "react-hook-form";

import Input, { InputProps } from "./Input";

interface Props<T extends FieldValues> extends InputProps {
	containerClass?: string;
	name: FieldPath<T>;
}

const FormInput = <T extends FieldValues>({ containerClass, name, ...rest }: Props<T>) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className={`flex flex-col ${containerClass}`}>
			<Input id={name} {...register(name)} {...rest} />
			{errors[name] && <p className={`mt-1 ml-1 text-xs text-red-700 `}>{errors[name]?.message as string}</p>}
		</div>
	);
};

export default FormInput;
