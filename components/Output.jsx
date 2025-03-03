"use client";

import { executeCode } from '@/api/api';
import { useAppContext } from '@/contexts/AppContext';
import React, { useState } from 'react'

function Output() {
    const {language, boilerPlate: SourceCode} = useAppContext()

    const [output, setOutput] = useState(null)

    return (
        <div className='w-[36%]  flex flex-col h-full'>
            <div className='flex justify-between items-center w-full h-12 border-b border-l'>
                <div className='flex px-5'>
                    Output
                </div>
                <div className='flex items-center px-10 justify-end gap-2'>
                    <button className='flex items-center justify-center h-10 hover:bg-gray-800 px-4 transition duration-200 gap-2 border-1 cursor-pointer'>
                        Clear
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {
                    output ? (
                        output
                    ) : (
                        <p>
                            Run the code to see the Output
                            <br />
                            Developed by Vivek Kumar Gupta
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Output
