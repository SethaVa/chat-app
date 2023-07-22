"use client"

import useRoutes from "@/app/hooks/useRoutes"
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingModal from "./SettingModal";

interface DesktopSidebarProps{
    currentUser: User
}
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SettingModal 
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="hidden lg:inset-y-0 lg:fixed lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="flex flex-col justify-between mt-4">
                    <ul
                        role="list"
                        className="space-y-1 flex flex-col items-center"
                    >
                        {
                            routes.map(item => (
                                <DesktopItem
                                    key={item.label}
                                    label={item.label}
                                    href={item.href}
                                    icon={item.icon}
                                    onClick={item.onClick}
                                    active={item.active}
                                />
                            ))
                        }
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <div 
                        className=" cursor-pointer hover:opacity-70 transition"
                        onClick={() => setIsOpen(true)}
                    >
                        <Avatar user={currentUser} />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default DesktopSidebar