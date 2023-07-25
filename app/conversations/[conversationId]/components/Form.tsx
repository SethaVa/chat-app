"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs"
import MessageInput from "./MessageInput";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'

const Form = () => {
    const {conversationId} = useConversation();
    const [emojiModalOpen, setEmojiModalOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
    const { styles, attributes } = usePopper(referenceElement, popperElement);


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", {shouldValidate: true})

        axios.post("/api/messages", {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post("/api/messages", {
            image: result.info.secure_url,
            conversationId
        })
    }

    const message = watch("message");

    function onClick(emojiData: EmojiClickData, event: MouseEvent) {
        setValue(
            "message", 
            message + emojiData.emoji,
            {shouldValidate: true}
        )
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadWidget uploadPreset="chat-app" onUpload={handleUpload} options={{maxFiles: 1}}>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <HiPhoto size={30} className="text-indigo-500 hover:text-indigo-600 cursor-pointer transition" onClick={onClick}/>
                    );
                }}
            </CldUploadWidget>

            <Popover>
                <Popover.Button ref={setReferenceElement}>
                    <BsEmojiSmile 
                        size={24}
                        onClick={() => setEmojiModalOpen(true)}
                        className="text-indigo-500 hover:text-indigo-600 cursor-pointer transition"
                    />  
                </Popover.Button>

                <Popover.Panel
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <EmojiPicker
                    onEmojiClick={onClick}
                    autoFocusSearch={false}
                />
                </Popover.Panel>
            </Popover>
            
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="White a message"
                />
                <button
                    type="submit"
                    className=" rounded-full p-2 bg-indigo-500 hover:bg-indigo-600 cursor-pointer transition"
                >
                    <HiPaperAirplane size={18} className="text-white"/>
                </button>
            </form>
        </div>
    )
}

export default Form;