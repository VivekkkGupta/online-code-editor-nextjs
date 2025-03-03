"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../constants/constants';
import { executeCode } from "@/api/api";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {

    const [language, setLanguage] = useState('cpp');
    const [extension, setExtension] = useState(LANGUAGES[language].extension);
    const [userCode, setUserCode] = useState(LANGUAGES[language].helloWorld);
    const [languageVersion, setLanguageVersion] = useState(LANGUAGES[language].version);
    const [output, setOutput] = useState(null);

    const [loading,setLoading] = useState(false);

    const [editorTheme, setEditorTheme] = useState('light');

    const handleExecuteCode = async()=>{
        // console.log("click")
        try {
            setLoading(true)
            setOutput("Loading...")
            const response = await executeCode(language,userCode);
            setOutput(response.data.run.output);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setOutput("Error: "+ error)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('selectedLanguage');
            if (storedLanguage) {
                setLanguage(storedLanguage);
                setExtension(LANGUAGES[storedLanguage].extension);
                setUserCode(LANGUAGES[storedLanguage].helloWorld);
                setLanguageVersion(LANGUAGES[storedLanguage].version);
                // console.log( "Language stored: ",storedLanguage, "\nBoilerPlate : ", LANGUAGES[language].helloWorld,"\nExtension : ",LANGUAGES[language].extension)
            }
        }
    }, []);

    const values = {
        language, 
        setLanguage, 
        userCode, 
        setUserCode,
        editorTheme, 
        setEditorTheme, 
        extension, 
        setExtension,
        output,
        setOutput,
        languageVersion,
        setLanguageVersion,
        handleExecuteCode,
        loading
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}