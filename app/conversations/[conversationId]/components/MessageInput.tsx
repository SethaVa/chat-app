"use client"

import React from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps{
    id: string,
    placeholder?: string,
    required?: boolean,
    type?: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    placeholder,
    required,
    type,
    register,
    errors
}) => {
    return (
        <div className="relative w-full">
            <input 
                id={id}
                autoComplete={id}
                type={type}
                placeholder={placeholder}
                {...register(id, {required})}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            />
        </div>
    )
}

export default MessageInput