"use client";

import React from 'react'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { useAppContext } from '@/contexts/AppContext'

function OutputSection() {
    const { output } = useAppContext();

    return (
        <div className="h-full w-full flex flex-col gap-1 pt-2">
            <div className='flex justify-between items-center px-4 py-2'>
                <Label htmlFor="outputmessage">Output: </Label>
            </div>
            <Textarea
                id="outputmessage"
                className={`h-full`}
                value={output}
                readOnly
            />
        </div>
    )
}

export default OutputSection;
