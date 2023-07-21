"use client"

import { User } from "@prisma/client"
import Image from "next/image"
import React from "react"

interface AvatarProps{
    user: User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative flex items-center">
            <div className=" relative inline-block rounded-full overflow-hidden w-9 h-9 md:h-11 md:w-11">
                <Image 
                    fill
                    src={user?.image || '/images/placeholder.jpg'}
                    alt="Avatar"
                />
            </div>
            <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 w-2 h-2 md:h-3 md:w-3"/>
        </div>
    )
}

export default Avatar