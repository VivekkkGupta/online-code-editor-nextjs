"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/contexts/AppContext'
import { Sparkles } from 'lucide-react'

function AiButton() {
    const { setCoderszState } = useAppContext()
    return (
        <Button
            className="relative cursor-pointer rounded-full
          border-2 border-transparent bg-clip-padding
          hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] 
          transition-all duration-300
          before:absolute before:inset-0 before:rounded-full before:-z-10
          before:p-[2px] before:bg-gradient-to-r before:from-purple-500 
          before:to-pink-500"
            onClick={() =>
                setCoderszState(prev => ({ ...prev, aiChatOpen: !prev[aiChatOpen] }))
            }
            title="AI Assistant (Ctrl + I)"
        >
            <span className="bg-clip-text font-semibold flex items-center gap-2">
                <Sparkles />
                AI{" "}
            </span>
        </Button>
    )
}

export default AiButton
