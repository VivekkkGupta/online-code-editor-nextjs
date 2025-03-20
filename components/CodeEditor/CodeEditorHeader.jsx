"use client";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import EditorThemeChoice from "./CodeEditorHeaderHelper/EditorThemeChoice";
import SelectLanguage from "./CodeEditorHeaderHelper/SelectLanguage";
import DownloadCode from "./CodeEditorHeaderHelper/DownloadCode";

function CodeEditorHeader() {
  const { handleExecuteCode, loading } = useAppContext();

  return (
    <div className="flex justify-between h-[4rem] w-full border-b items-center px-10">
      {/* <div className="border-r flex px-5 items-center">main{extension}</div> */}
      <div className="flex items-center gap-2">
        <SelectLanguage />
        <DownloadCode />
      </div>
      <div className="flex items-center py-2  justify-end w-full gap-2">
        <EditorThemeChoice />
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
