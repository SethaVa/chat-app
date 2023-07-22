"use client"

import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import { format } from "date-fns"
import React, { Fragment, useMemo } from "react"
import { Dialog, Transition } from '@headlessui/react';
import { IoClose, IoTrash } from "react-icons/io5"
import Avatar from "@/app/components/Avatar"

interface ProfileDrawerProps{
    data: Conversation & {
        users: User[]
    },
    isOpen: boolean,
    onClose(): void,
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    data,
    isOpen,
    onClose
}) => {
    const otherUser = useOtherUser(data);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), "PP");
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} members`
        }
        return "Active";
    }, [data])

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Dialog background */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 opacity-40 bg-black"
                    ></div>
                </Transition.Child>
                <div className="fixed overflow-hidden inset-0">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className=" pointer-events-none fixed inset-y-0 flex right-0 pl-10 max-w-full">
                            {/* Dialog body */}
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0" 
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveTo="translate-x-full"
                                leaveFrom="translate-x-0"
                            >
                                <Dialog.Panel
                                    className=" pointer-events-auto w-screen max-w-md"
                                >
                                    <div className=" flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        {/* Dialog close button */}
                                        <div className="px-4 sm:px-6">
                                            <div className=" flex items-start justify-end">
                                                <div className=" flex ml-3 h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                                        onClick={onClose}
                                                    >
                                                        <span className=" sr-only">Close panel</span>
                                                        <IoClose size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Avatar */}
                                        <div className=" relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2">
                                                    <Avatar user={otherUser} />
                                                </div>
                                                <div>{title}</div>
                                                <div className=" text-sm text-gray-500">
                                                    {statusText}
                                                </div>
                                                <div className="flex gap-10 my-8">
                                                    <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                                                            <IoTrash size={20} />
                                                        </div>
                                                        <div className="text-sm font-light text-neutral-600">
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                    <dl className="px-4 space-y-8 sm:px-6 sm:space-y-6">
                                                        {
                                                            !data.isGroup && (
                                                                <>
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Email
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                            {otherUser.email}
                                                                        </dd>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ProfileDrawer