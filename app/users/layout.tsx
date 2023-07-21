import getUser from "../actions/getUsers"
import SideBar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList";

interface UsersLayoutProps{
    children: React.ReactNode
}

export default async function UsersLayout({
    children
}: UsersLayoutProps){
    const users = await getUser();

    return (
        <SideBar>
            <div className="h-full">
                <UserList users={users}/>
                {children}
            </div>
        </SideBar>
    )
}