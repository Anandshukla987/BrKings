import React from 'react'

const baseClass = "rounded-lg placeholder:text-black"

const TextInput = ({
    label,
    type,
    name,
    placeholder,
    onChange,
    value
}) => {
    return (
        <label for={name} className="loginInput">
            <p className="font-bold">{label}</p>
            <input
                className={baseClass}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={name}
                name={name}
            />
        </label>
    )
}
export default TextInput;
