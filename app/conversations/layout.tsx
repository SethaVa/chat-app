import React from "react";
import SideBar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import useConversation from "../hooks/useConversation";
import getConversations from "../actions/getConversations";
import getUser from "../actions/getUsers";

export default async function ConversationsLayout({
    children
  }: {
    children: React.ReactNode,
  }) {
    const conversations = await getConversations();
    const users = await getUser();

    return (
      <SideBar>
        <div className="h-full">
          <ConversationList 
            conversations={conversations}
            users={users}
          />
          {children}
        </div>
      </SideBar>
    );
  }