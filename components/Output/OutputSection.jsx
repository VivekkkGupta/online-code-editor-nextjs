import React from 'react'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useAppContext } from '@/contexts/AppContext'

function OutputSection() {

    const { output, setOutput } = useAppContext()
    return (
        <div className="h-full w-full flex flex-col gap-1 pt-2">
            <div className='flex justify-between items-center  px-4'>
                <Label htmlFor="outputmessage" onClick={() => setOutput(" ")}>Output: </Label>
                <Button variant={"ghost"} className={`cursor-pointer`}>Clear Output</Button>
            </div>
            <Textarea id="outputmessage" className={`h-full`} value={output} readOnly />
        </div>
        //  {
        //     output ? (
        //         <pre>
        //             {output}
        //         </pre>
        //     ) : (
        //         <p>
        //             Run the code to see the Output
        //             <br />
        //             Developed by Vivek Kumar Gupta
        //         </p>
        //     )
        // }
    )
}

export default OutputSection
