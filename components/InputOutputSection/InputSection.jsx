import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useAppContext } from '@/contexts/AppContext'

function InputSection() {

    const { userInput, setUserInput } = useAppContext()

    return (
        <div className="h-full w-full flex flex-col gap-1 pt-2">
            <div className='flex justify-between items-center px-4 py-2'>
                <Label htmlFor="inputmessage">Input: </Label>
                {/* <Button
                    variant={"ghost"}
                    className={`cursor-pointer`}
                    onClick={() => setUserInput(" ")}
                >
                    Clear Input
                </Button> */}
            </div>
            <Textarea
                id="inputmessage"
                className={`h-full`}
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
            />
        </div>
    )
}

export default InputSection
