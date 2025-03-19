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

function SelectLanguage() {
    const {
        language,
        handleLanguageChange
    } = useAppContext();


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
