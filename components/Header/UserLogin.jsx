
import React from 'react'
import { Button } from '../ui/button';
import { useSession, signIn, signOut } from "next-auth/react"

function UserLogin() {
    // const { data: session } = useSession()
    const session = null;
    return (
        <div>
            {
                session ? (
                    <>
                        Signed in as {session.user.email} <br />
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                    <Button variant={"default"} className={`cursor-pointer`}
                        onClick={() => signIn()}
                    >
                        Login
                    </Button>
                )
            }
        </div>
    )
}

export default UserLogin
