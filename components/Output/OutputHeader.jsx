import { useAppContext } from '@/contexts/AppContext'
import React from 'react'

function OutputHeader() {

    const { setOutput } = useAppContext()
    return (
        <div className='flex justify-between items-center w-full h-[4rem] border-b border-l'>
            <div className='flex px-5'>
                Output
            </div>
            <div className='flex items-center px-10 justify-end gap-2 '>
                <button
                    onClick={() => setOutput(" ")}
                    className='flex items-center justify-center h-10 hover:bg-gray-800 px-4 transition duration-200 gap-2 border-1 cursor-pointer'>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default OutputHeader
