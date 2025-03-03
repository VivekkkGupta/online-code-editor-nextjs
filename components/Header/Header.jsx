import React from 'react'
import { APP_NAME } from "@/constants/constants";
import ModeToggle from '../mode-toggle';

function Header() {
    return (
        <>
            <div className='w-full h-[5rem] px-10 flex items-center justify-between border-b'>
                <div>
                    <h1 className='font-extrabold text-2xl tracking-tighter'>
                        {APP_NAME}
                    </h1>
                </div>
                <div className=''>
                    <ModeToggle />
                </div>
            </div>

        </>
    )
}

export default Header
