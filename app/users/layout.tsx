import SideBar from "../components/sidebar/Sidebar"

interface UsersLayoutProps{
    children: React.ReactNode
}

export default async function UsersLayout({
    children
}: UsersLayoutProps){
    return (
        <SideBar>
            <div className="h-full">
                {children}
            </div>
        </SideBar>
    )
}