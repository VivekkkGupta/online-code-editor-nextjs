"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Play, Share2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ShareButton() {
  const handleShareButton = () => {
    console.log("Cicked")
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`cursor-pointer bg-green-500 hover:bg-green-600 duration-300 transition-all`}
          >
            <Share2 className="" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-center text-xs">
          <DialogHeader>
            <DialogTitle>Live Collaboration</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 mt-5">
            <div>
              Invite people to collaborate on your code.
            </div>
            <div >
              Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw.
            </div>
            <Button type="submit" className={`cursor-pointer bg-green-500 hover:bg-green-600 duration-300 transition-all`}> <Play />Start Session</Button>
          </div>


          <div className="relative flex items-center justify-center w-full my-4">
            <div className="absolute w-full h-[1px]  bg-border"></div>
            <span className="relative px-2 text-sm text-muted-foreground bg-background">or</span>
          </div>

          <div className='flex flex-col items-center gap-4'>
            <div>Shareable Link</div>
            <div>Export as a read-only link.</div>
            <Button type="submit" className={`cursor-pointer bg-green-500 hover:bg-green-600 duration-300 transition-all`}><Link /> Export to Link</Button>
          </div>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default ShareButton