"use client"

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/modals/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface GroupChatModalProps{
    isOpen?: boolean,
    users: User[],
    onClose: () => void
}
const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    users,
    onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    })

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true);

        axios.post("/api/conversations", {
            ...data,
            isGroup: true
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => {
            toast.error("Something went wrong");
        }) 
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        {/* Modal header */}
                         <h2 className=" text-base font-semibold leading-7 text-gray-900">
                            Create a group chat
                         </h2>

                         {/* Modal information */}
                         <p className="mt-1 text-gray-600 text-sm leading-6">
                            Create a chat with more than 2 people
                         </p>

                         <div className="mt-10 gap-y-8 flex flex-col">
                            <Input 
                                register={register}
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />

                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={
                                    users.map((user) => (
                                        {label: user.name, value: user.id}
                                    ))
                                }
                                value={members}
                                onChange={(value: any) => setValue("members", value, {
                                    shouldValidate: true
                                })}
                            />
                         </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        secondary
                        onClick={onClose}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}

                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal;