"use client"

import { signOut } from "next-auth/react";
import Button from "../components/Button";

const Users = () => {
    return (
        <Button onClick={() => signOut()}>Log out</Button>
    )
}

export default Users;