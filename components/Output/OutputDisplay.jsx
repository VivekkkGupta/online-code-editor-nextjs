import { useAppContext } from '@/contexts/AppContext'
import React from 'react'

function OutputDisplay() {
    const { output } = useAppContext()

    return (
        <div className=' h-[calc(100vh-9rem)] px-3 py-2 overflow-scroll'>
            {
                output ? (
                    <pre>
                        {output}
                    </pre>
                ) : (
                    <p>
                        Run the code to see the Output
                        <br />
                        Developed by Vivek Kumar Gupta
                    </p>
                )
            }
        </div>
    )
}

export default OutputDisplay
