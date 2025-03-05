import { useAppContext } from '@/contexts/AppContext'
import React from 'react'
import { Button } from '../ui/button'

function OutputHeader() {

    const { setOutput } = useAppContext()
    return (
        <div className='flex justify-between items-center w-full h-[4rem] border-b border-l'>
            <div className='flex px-5'>
                Output
            </div>
            <div className='flex items-center px-10 justify-end gap-2 '>
                <Button
                    onClick={() => setOutput(" ")}
                    className={`cursor-pointer`}
                    variant={"outline"}
                    >
                    Clear
                </Button>
            </div>
        </div>
    )
}

export default OutputHeader
