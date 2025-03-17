"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../lib/constants/constants';
import { executeCode } from "@/apis/CodeExecutor/code-executor-api";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [coderszState, setCoderszState] = useState([
        {
            editorTheme: "vs",
            aiChatOpen: true,
        }
    ]);

    const [codeDetailsObj, setCodeDetailsObj] = useState(
        {
            cpp: {
                language: 'cpp',
                languageVersion: LANGUAGES['cpp'].version,
                langaugeExtension: LANGUAGES['cpp'].extension,
                languageCode: LANGUAGES['cpp'].helloWorld,
                userInput: "",
                codeOutput: "",
            }
        }
    )

    // const [isChatOpen, setIsChatOpen] = useState(true);
    // const [language, setLanguage] = useState('cpp');
    // const [userCode, setUserCode] = useState(LANGUAGES[language].helloWorld);
    // const [extension, setExtension] = useState(LANGUAGES[language].extension);
    // const [languageVersion, setLanguageVersion] = useState(LANGUAGES[language].version);
    // const [userInput, setUserInput] = useState('');
    // const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    // const [editorTheme, setEditorTheme] = useState('vs');

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
        if (event.ctrlKey && event.key.toLowerCase() === 's') {
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

    const handleCtrlI = async (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === 'i') {
            event.preventDefault();
            setIsChatOpen(prev => !prev)
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
        document.addEventListener('keydown', handleCtrlI);

        // Cleanup: remove event listeners when component unmounts
        return () => {
            document.removeEventListener('keydown', handleCtrlS);
            document.removeEventListener('keydown', handleCtrlEnter);
            document.removeEventListener('keydown', handleCtrlI);
        };
    }, [handleExecuteCode, setIsChatOpen]);

    const values = {
        handleExecuteCode, handleCodeChange,
        loading, setLoading,
        coderszState,
        setCoderszState,
        codeDetailsObj,
        setCodeDetailsObj
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}