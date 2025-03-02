"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleThemeChange = () => {
        console.log("Current theme:", theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    return (
        <button
            className="flex items-center justify-center h-10 w-10 hover:bg-gray-400 transition duration-200 border-1 cursor-pointer"
            onClick={(e) => handleThemeChange(e)}
        >
            {
                theme == "light" ? (
                    <SunIcon className="text-sm" />
                ) : (
                    <MoonIcon className="text-sm" />
                )
            }
        </button>
    );
};

export default ModeToggle;
