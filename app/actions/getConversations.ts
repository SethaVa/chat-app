import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser"
import prisma from "@/app/libs/prismadb";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id){
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            orderBy: {
                lastMessageAt: "desc"
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return conversations
    } catch (error) {
        console.log("[GET_CONVERSATIONS]:", error);
        return []
    }
}

export default getConversations;