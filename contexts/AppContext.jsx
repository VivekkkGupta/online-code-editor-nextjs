"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../lib/constants/constants';
import { executeCode } from "@/apis/CodeExecutor/code-executor-api";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    // Separate states for each component
    const [editorTheme, setEditorTheme] = useState("vs");
    const [aiChatOpen, setAiChatOpen] = useState(true);
    const [language, setLanguage] = useState("cpp");
    const [languageVersion, setLanguageVersion] = useState(LANGUAGES['cpp'].version);
    const [extension, setExtension] = useState(LANGUAGES['cpp'].extension);
    const [userCode, setUserCode] = useState(LANGUAGES['cpp'].helloWorld);
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCodeChange = (newValue) => {
        setUserCode(newValue);
    };

    const handleExecuteCode = async () => {
        try {
            setLoading(true);
            setOutput("Loading...");

            const response = await executeCode(
                language,
                userCode,
                userInput
            );

            setOutput(response.data.run.output);
        } catch (error) {
            setOutput("Error: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleCtrlS = async (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            await handleExecuteCode();
        }
    };

    const handleCtrlEnter = async (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            await handleExecuteCode();
        }
    };

    const handleCtrlI = async (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === 'i') {
            event.preventDefault();
            setAiChatOpen(!aiChatOpen);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("editorTheme");
        if (savedTheme) {
            setEditorTheme(savedTheme);
        }

        const savedLanguage = localStorage.getItem("selectedLanguage");
        if (savedLanguage) {
            setLanguage(savedLanguage);
            setLanguageVersion(LANGUAGES[savedLanguage].version);
            setExtension(LANGUAGES[savedLanguage].extension);
            setUserCode(LANGUAGES[savedLanguage].helloWorld);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleCtrlS);
        document.addEventListener('keydown', handleCtrlEnter);
        document.addEventListener('keydown', handleCtrlI);

        return () => {
            document.removeEventListener('keydown', handleCtrlS);
            document.removeEventListener('keydown', handleCtrlEnter);
            document.removeEventListener('keydown', handleCtrlI);
        };
    }, [handleExecuteCode]);

    const values = {
        // Editor theme states
        editorTheme,
        setEditorTheme,

        // AI chat states
        aiChatOpen,
        setAiChatOpen,

        // Language states
        language,
        setLanguage,
        languageVersion,
        setLanguageVersion,
        extension,
        setExtension,

        // Code states
        userCode,
        setUserCode,
        userInput,
        setUserInput,
        output,
        setOutput,

        // Loading state
        loading,
        setLoading,

        // Handlers
        handleExecuteCode,
        handleCodeChange
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};