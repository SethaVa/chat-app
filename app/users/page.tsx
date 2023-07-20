"use client"

import { signOut } from "next-auth/react";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";

const Users = () => {
    return (
        <div className="h-full hidden lg:block lg:pl-80">
            <EmptyState />
        </div>
    )
}

export default Users;