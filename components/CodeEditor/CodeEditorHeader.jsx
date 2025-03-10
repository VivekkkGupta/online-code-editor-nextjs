"use client";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Share2 } from "lucide-react";
import EditorThemeChoice from "./EditorThemeChoice";

function CodeEditorHeader() {
  const { extension, handleExecuteCode, loading, isChatOpen,setIsChatOpen } = useAppContext();

  const [shareStatus, setShareStatus] = useState("Share");

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Copied!");

      // Reset status after 2 seconds
      setTimeout(() => {
        setShareStatus("Share");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      setShareStatus("Failed to copy");
    }
  };

  return (
    <div className="flex justify-between h-[4rem] w-full border-b">
      <div className="border-r flex px-5 items-center">main{extension}</div>
      <div className="flex items-center py-2 px-10 justify-end gap-2">
        <Button
          className="relative cursor-pointer rounded-full
          border-2 border-transparent bg-clip-padding
          hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] 
          transition-all duration-300
          before:absolute before:inset-0 before:rounded-full before:-z-10
          before:p-[2px] before:bg-gradient-to-r before:from-purple-500 
          before:to-pink-500"
          onClick={() => 
            setIsChatOpen(prev=>!prev)
          }
          title="AI Assistant (Ctrl + I)"
        >
          <span className="bg-clip-text font-semibold">
            AI{" "}
            <kbd className="px-1 py-0.5 text-[10px] tracking-tighter bg-black/20 rounded">
              Ctrl + I
            </kbd>
          </span>
        </Button>
        <EditorThemeChoice />

        <Button
          className={`cursor-pointer`}
          variant="outline"
          onClick={handleShare}
        >
          <Share2 className="" /> {shareStatus}
        </Button>

        <Button
          variant="default" // Use Shadcn's default button style
          className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer ml-10" // Custom colors
          onClick={handleExecuteCode}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Please wait
            </>
          ) : (
            <>
              <Play className="" /> Run
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default CodeEditorHeader;
