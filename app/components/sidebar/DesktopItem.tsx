"use client"

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface DesktopItemProps{
    label: string,
    icon: any,
    href: string,
    onClick?: () => void,
    active?: boolean
}
const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {
    const handleClick = () => {
        if(onClick){
            return onClick();
        }
    }

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(`
                    group
                    flex
                    group-x-3
                    rounded-md
                    p-6
                    text-sm
                    leading-6
                    font-semibold
                    text-indigo-500
                    hover:bg-gray-100
                    hover:text-indigo-600
                `,
                active && `bg-gray-100 text-black`
                )}
            >
                <Icon className="w-6 h-6 shrink-0" />
                <span className=" sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;