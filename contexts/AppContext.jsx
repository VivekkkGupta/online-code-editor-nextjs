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
    const [userInput, setUserInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [editorTheme, setEditorTheme] = useState('vs');

    const handleCodeChange = (newValue) => {
        setUserCode(newValue);
    };

    const handleExecuteCode = async () => {
        console.log(userCode)
        try {
            setLoading(true)
            setOutput("Loading...")
            const response = await executeCode(language, userCode, userInput);
            setOutput(response.data.run.output);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setOutput("Error: " + error)
        }
    }

    const handleCtrlS = async (event) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            await handleExecuteCode()
        }
    };

    const handleCtrlEnter = async (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            await handleExecuteCode()
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('selectedLanguage');
            if (storedLanguage) {
                setLanguage(storedLanguage);
                setExtension(LANGUAGES[storedLanguage].extension);
                setUserCode(LANGUAGES[storedLanguage].helloWorld);
                setLanguageVersion(LANGUAGES[storedLanguage].version);
                // console.log( "Language stored: ",storedLanguage, "\nBoilerPlate : ", LANGUAGES[language].helloWorld,"\nExtension : ",LANGUAGES[language].extension)w
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleCtrlS);
        document.addEventListener('keydown', handleCtrlEnter);

        // Cleanup: remove event listeners when component unmounts
        return () => {
            document.removeEventListener('keydown', handleCtrlS);
            document.removeEventListener('keydown', handleCtrlEnter);
        };
    }, [handleExecuteCode]);

    const values = {
        language,
        setLanguage,
        userCode,
        setUserCode,
        userInput,
        setUserInput,
        editorTheme,
        setEditorTheme,
        extension,
        setExtension,
        output,
        setOutput,
        languageVersion,
        setLanguageVersion,
        handleExecuteCode,
        loading,
        handleCodeChange
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}