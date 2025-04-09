import { Input as InputHeroi } from '@heroui/input';
import React, { HTMLInputTypeAttribute } from 'react';
import { useController, type Control } from 'react-hook-form';

interface IInput {
	type?: HTMLInputTypeAttribute;
	label?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	control: Control<any>;
	size?: 'sm' | 'md' | 'lg' | undefined;
	endContent?: React.ReactNode;
	className?: string;
	defaultValue?: string;
}

export function Input({
	required,
	control,
	name,
	label,
	type,
	placeholder,
	size,
	endContent,
	className,
	defaultValue,
}: IInput) {
	const { field } = useController({
		name,
		control,
		rules: {
			required,
		},
	});

	return (
		<InputHeroi
			type={type}
			id={name}
			placeholder={placeholder}
			value={field.value}
			name={field.name}
			onChange={field.onChange}
			onBlur={field.onBlur}
			size={size}
			endContent={endContent}
			className={className}
			label={label}
			isRequired={required}
			defaultValue={defaultValue}
		/>
	);
}
