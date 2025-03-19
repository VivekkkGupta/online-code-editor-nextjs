import { Button } from '@/components/ui/button'
import { useAppContext } from '@/contexts/AppContext'
import { Download } from 'lucide-react'
import React from 'react'

function DownloadCode() {
    const { handleDownloadCode } = useAppContext()
    return (
        <Button variant={"outline"} className={`cursor-pointer`}>
            <Download />
        </Button>
    )
}

export default DownloadCode
