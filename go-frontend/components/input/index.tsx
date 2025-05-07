import { HTMLInputTypeAttribute } from "react";

export const Input = ({ type = "text", placeholder = "", value, onChange }: { type?: HTMLInputTypeAttribute; placeholder?: string; value: string | number | undefined; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}