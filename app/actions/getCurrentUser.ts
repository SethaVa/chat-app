import useSession from "./getSession";
import prisma from "@/app/libs/prismadb";

const getCurrentUser = async () => {
    try {
        const session = await useSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if(!currentUser) return null;

        return currentUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default getCurrentUser;