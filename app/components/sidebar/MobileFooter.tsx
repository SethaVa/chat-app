"use client"

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes();
    const {isOpen} = useConversation();

    if(isOpen){
        return null;
    }

    return (
        <div
            className="fixed justify-between z-40 w-full bottom-0 flex items-center bg-white lg:hidden border-t-[1px]"
        >
            {
                routes.map((route) => (
                    <MobileItem
                        key={route.label}
                        icon={route.icon}
                        onClick={route.onClick}
                        active={route.active}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}

export default MobileFooter;