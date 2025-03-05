"use client";
import Editortheme from "./Editortheme";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Share2 } from "lucide-react";

function CodeEditorHeader() {
  const { extension, handleExecuteCode, loading } = useAppContext();

  const [shareStatus, setShareStatus] = useState("Share"); // Add this state

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
        <Editortheme />

        <Button className={`cursor-pointer`} variant="outline" onClick={handleShare}>
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
