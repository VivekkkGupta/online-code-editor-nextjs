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
        language,
        setLanguage,
        setLanguageVersion,
        setExtension,
        setUserCode,
        setUserInput,
        setOutput
    } = useAppContext();

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        setLanguageVersion(LANGUAGES[newLanguage].version);
        setExtension(LANGUAGES[newLanguage].extension);
        setUserCode(LANGUAGES[newLanguage].helloWorld);
        setUserInput("");
        setOutput("");

        // Save to localStorage
        localStorage.setItem("selectedLanguage", newLanguage);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem("selectedLanguage");
        if (savedLanguage) {
            handleLanguageChange(savedLanguage);
        } else {
            handleLanguageChange('cpp');
        }
    }, []);

    return (
        <Select value={language} onValueChange={handleLanguageChange}>
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
