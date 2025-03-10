import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditorThemeChoice() {
  const { editorTheme, setEditorTheme } = useAppContext();

  const handleThemeChange = (value) => {
    setEditorTheme(value);
    localStorage.setItem("editorTheme", value);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("editorTheme");
    if (savedTheme) {
      setEditorTheme(savedTheme);
    } else {
      setEditorTheme("vs");
    }
  }, [setEditorTheme]);

  return (
    <Select value={editorTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Modes</SelectLabel>
          <SelectItem value="vs">Visual Studio Light</SelectItem>
          <SelectItem value="vs-dark">Visual Studio Dark</SelectItem>
          <SelectItem value="hc-black">High Contrast Black</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default EditorThemeChoice;
