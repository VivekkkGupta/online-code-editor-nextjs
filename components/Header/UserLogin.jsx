"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function UserLogin() {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <>
                    <span className="mr-4">{session?.user?.name}</span>
                    <button onClick={() => signOut()} className="bg-red-500 px-4 py-2">Logout</button>
                </>
            ) : (
                <Button onClick={() => signIn()} className={`cursor-pointer`}>Login</Button>
            )}
        </>
    );
}
