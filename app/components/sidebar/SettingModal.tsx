import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../modals/Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button";

interface SettingModalProps{
    isOpen: boolean,
    onClose: () => void,
    currentUser: User
}

const SettingModal: React.FC<SettingModalProps> = ({
    isOpen,
    onClose,
    currentUser
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
          name: currentUser?.name,
          image: currentUser?.image
        }
    });

    const image = watch("image");
    
    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/settings", data)
        .then(() => {
            router.refresh();
            onClose()
        }).catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className=" text-base font-semibold leading-7 text-gray-900">
                            Profiles
                        </h2>
                        <p className="text-sm mt-1 leading-6 text-gray-600">
                            Edit your public information
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input 
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />

                            {/* Image Uploader */}
                            <div>
                                <label className="block font-medium text-sm leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image 
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        alt="Avatar"
                                        src={image || currentUser?.image || "/images/placeholder.jpg"}
                                    />
                                    <CldUploadWidget uploadPreset="chat-app" onUpload={handleUpload} options={{maxFiles: 1}}>
                                        {({ open }) => {
                                            const onClick = () => {
                                                open();
                                            };

                                            return (
                                                <Button 
                                                    type="button"
                                                    secondary
                                                    disabled={isLoading}
                                                    onClick={onClick}
                                                >
                                                    Change
                                                </Button>
                                                // <HiPhoto size={30} className="text-sky-500" onClick={onClick}/>
                                            );
                                        }}
                                    </CldUploadWidget>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Modal */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingModal;
