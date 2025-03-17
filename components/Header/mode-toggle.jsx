"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "../ui/button";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    return (
        <Button className={`cursor-pointer`} variant="outline" size="icon"
            onClick={(e) => handleThemeChange(e)}
        >

            {
                theme == "light" ? (
                    <SunIcon className="text-sm" />
                ) : (
                    <MoonIcon className="text-sm" />
                )
            }
        </Button>
    );
};

export default ModeToggle;
