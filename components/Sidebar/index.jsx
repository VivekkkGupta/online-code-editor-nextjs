"use client";

import React from "react";
import { SiCplusplus, SiPython, SiJavascript } from "react-icons/si";
import { LiaJava } from "react-icons/lia";
import { useAppContext } from "@/contexts/AppContext";
import { LANGUAGES } from "@/lib/constants/constants";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const {
    language,
    setLanguage,
    setUserCode,
    setExtension,
    setLanguageVersion,
  } = useAppContext();

  const handleLanguageChange = (language) => {
    setLanguage(language);
    localStorage.setItem("selectedLanguage", language);

    setExtension(LANGUAGES[language].extension);
    setUserCode(LANGUAGES[language].helloWorld);
    setLanguageVersion(LANGUAGES[language].version);
  };

  return (
    <div className="w-[5vw] flex flex-col items-center gap-4 py-10 border-r">
      <Button
        className={`${language === "cpp" ? "bg-white text-black hover:bg-white hover:text-black" : ""} cursor-pointer`}
        variant="outline"
        size="icon"
        onClick={() => handleLanguageChange("cpp")}
        
      >
        <SiCplusplus className="text-xl" />
      </Button>
      <Button
        className={`${language === "python" ? "bg-white text-black hover:bg-white hover:text-black" : ""} cursor-pointer`}
        variant="outline"
        size="icon"
        onClick={() => handleLanguageChange("python")}
      >
        <SiPython className="text-xl" />
      </Button>
      <Button
        className={`${language === "javascript" ? "bg-white text-black hover:bg-white hover:text-black" : ""} cursor-pointer`}
        variant="outline"
        size="icon"
        onClick={() => handleLanguageChange("javascript")}
      >
        <SiJavascript className="text-xl" />
      </Button>
      <Button
        className={`${language === "java" ? "bg-white text-black hover:bg-white hover:text-black" : ""} cursor-pointer`}
        variant="outline"
        size="icon"
        onClick={() => handleLanguageChange("java")}
      >
        <LiaJava className="text-2xl" />
      </Button>

    </div>
  );
}

export default Sidebar;
