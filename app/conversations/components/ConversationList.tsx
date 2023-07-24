'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd} from "react-icons/md"
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps{
    conversations: FullConversationType[],
    users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ 
    conversations,
    users
}) => {
    const session = useSession();

    const [conversationList, setConversationList] = useState(conversations);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const {conversationId, isOpen} = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])

    useEffect(() => {
        if(!pusherKey){
            return;
        }

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setConversationList(current => {
                if(find(current, {id: conversation.id})){
                    return current;
                }

                return [conversation, ...current];
            })
        }

        const updateHandler = (conversation: FullConversationType) => {
            setConversationList((current) => current.map((currentConversation) => {
              if(currentConversation.id === conversation.id){
                return conversation
              }
      
              return currentConversation;
            }))
        }

        const removeHandler = (conversation: FullConversationType) => {
            setConversationList((prev) => {
                return [...prev.filter((cond) => cond.id !== conversation.id)]; 
            })

            if(conversationId === conversation.id){
                router.push("/conversations");
            }
        } 

        pusherClient.bind("conversation:new", newHandler); 
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:remove", removeHandler);

        // unmount
        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
            pusherClient.unbind("conversation:update", updateHandler);
            pusherClient.bind("conversation:remove", removeHandler);
        }
    }, [pusherKey, conversationId, router])

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(
                    "fixed inset-y-0 pb-20 lg:pb-0 lg:w-80 lg:block lg:left-20 overflow-y-auto border-r border-gray-200",
                    isOpen? "hidden": "block w-full left-0"
                )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className=" text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div onClick={() => setIsModalOpen(true)} className="rounded-full p-2 bg-gray-100 text-gray-600 transition hover:opacity-70 cursor-pointer">
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>

                    {
                        conversationList.map((item) => (
                            <ConversationBox 
                                key={item.id}
                                data={item}
                                isSelected={conversationId === item.id}
                            />
                        ))
                    }
                </div>
            </aside>
        </>
    )
}

export default ConversationList;