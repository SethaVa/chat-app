"use client"

import { User } from "@prisma/client"
import React, { use, useCallback, useState } from "react"
import UserBox from "./UserBox"
import { useRouter } from "next/router"
import axios from "axios"

interface UserListProps{
    users: User[]
}

const UserList: React.FC<UserListProps> = ({
    users
}) => {
    return (
        <aside className="fixed pb-20 inset-y-0 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
            <div className="px-5">
                <div className=" flex-col">
                    <div className=" text-2xl font-bold py-4 text-neutral-800">
                        People
                    </div>
                </div>
                {
                    users.map((user) => (
                        <UserBox key={user.id} user={user}/>
                    ))
                }
            </div>
        </aside>
    )
}

export default UserList