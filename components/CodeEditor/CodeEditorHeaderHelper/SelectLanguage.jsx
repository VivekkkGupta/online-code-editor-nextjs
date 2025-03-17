"use client"

import React, { useEffect } from 'react'
import { useAppContext } from "../../../contexts/AppContext";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from '@/lib/constants/constants';

function SelectLanguage() {
    const {
        codeDetailsObj,
        setCodeDetailsObj
    } = useAppContext();

    const handleLanguageChange = (language) => {
        const tempObj = {
            [language]: {
                language: language,
                languageVersion: LANGUAGES[language].version,
                langaugeExtension: LANGUAGES[language].extension,
                languageCode: LANGUAGES[language].helloWorld,
                userInput: "",
                codeOutput: "",
            }
        }

        setCodeDetailsObj(prev => ({
            ...prev,
            ...tempObj
        }));

        // Save to localStorage
        localStorage.setItem("codersz-CodeDetails", JSON.stringify({
            ...codeDetailsObj,
            ...tempObj
        }));
    };

    // Get current language from codeDetailsObj
    const currentLanguage = Object.keys(codeDetailsObj)[0] || 'cpp';

    useEffect(() => {
        const savedDetails = localStorage.getItem("codersz-CodeDetails");
        if (savedDetails) {
            try {
                const parsedDetails = JSON.parse(savedDetails);
                setCodeDetailsObj(parsedDetails);
            } catch (error) {
                console.error("Error parsing saved code details:", error);
                // Set default if parsing fails
                handleLanguageChange('cpp');
            }
        } else {
            // Set default if no saved details
            handleLanguageChange('cpp');
        }
    }, []);

    return (
        <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectLanguage
