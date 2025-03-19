"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../lib/constants/constants';
import { executeCode } from "@/apis/CodeExecutor/code-executor-api";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    // Editor theme state
    const [editorTheme, setEditorTheme] = useState("vs");

    // AI chat state
    const [aiChatOpen, setAiChatOpen] = useState(true);

    // Language states
    const [language, setLanguage] = useState("cpp");
    const [languageVersion, setLanguageVersion] = useState(LANGUAGES['cpp'].version);
    const [extension, setExtension] = useState(LANGUAGES['cpp'].extension);

    // Code states
    const [userCode, setUserCode] = useState("");
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    // Load saved code for a specific language
    const loadSavedCode = (savedLanguage) => {
        try {
            const savedCode = localStorage.getItem('usercode');
            console.log('Loading saved code for language:', savedLanguage);
            console.log('Raw saved code from localStorage:', savedCode);

            if (savedCode) {
                const codeObj = JSON.parse(savedCode);
                console.log('Parsed code object:', codeObj);

                // If we have saved code for this language, return it
                if (codeObj[savedLanguage]) {
                    console.log('Found saved code for language:', savedLanguage);
                    return codeObj[savedLanguage];
                }
            }
            console.log('No saved code found, using hello world template');
            return LANGUAGES[savedLanguage].helloWorld;
        } catch (error) {
            console.error('Error loading code from localStorage:', error);
            return LANGUAGES[savedLanguage].helloWorld;
        }
    };

    // Save code to localStorage
    const saveCodeToStorage = (newValue, lang = language) => {
        try {
            const savedCode = localStorage.getItem('usercode');
            console.log('Saving code for language:', lang);
            console.log('Current saved code:', savedCode);

            const codeObj = savedCode ? JSON.parse(savedCode) : {};
            console.log('Current code object:', codeObj);

            // Always save the code, regardless of whether it's hello world or not
            codeObj[lang] = newValue;
            console.log('Updated code object:', codeObj);

            localStorage.setItem('usercode', JSON.stringify(codeObj));
            console.log('Saved to localStorage');
        } catch (error) {
            console.error('Error saving code to localStorage:', error);
        }
    };

    // Handle language change
    const handleLanguageChange = (newLanguage) => {
        console.log('Language change requested to:', newLanguage);
        console.log('Current language:', language);
        console.log('Current code:', userCode);

        // Save current code for current language
        saveCodeToStorage(userCode, language);

        // Update language and related states
        setLanguage(newLanguage);
        setLanguageVersion(LANGUAGES[newLanguage].version);
        setExtension(LANGUAGES[newLanguage].extension);

        // Load saved code for new language
        const savedCode = loadSavedCode(newLanguage);
        console.log('Setting new code:', savedCode);
        setUserCode(savedCode);

        // Save new language to localStorage
        localStorage.setItem("selectedLanguage", newLanguage);
    };

    // Handle code changes
    const handleCodeChange = (newValue) => {
        console.log('Code changed for language:', language);
        console.log('New code value:', newValue);
        setUserCode(newValue);
        saveCodeToStorage(newValue);
    };

    // Execute code
    const handleExecuteCode = async () => {
        try {
            setLoading(true);
            setOutput("Loading...");

            console.log('Executing code with:');
            console.log('Language:', language);
            console.log('Code:', userCode);
            console.log('Input:', userInput);

            const response = await executeCode(
                language,
                userCode,
                userInput
            );

            console.log('Execution response:', response.data.run.output);
            setOutput(response.data.run.output);
        } catch (error) {
            console.error('Execution error:', error);
            setOutput("Error: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCode = () => {
        try {
            // Create a blob with the code content
            const codeContent = userCode;
            const blob = new Blob([codeContent], { type: 'text/plain' });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;

            // Set the filename with proper extension
            const fileName = `code.${extension}`;
            link.download = fileName;

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL
            window.URL.revokeObjectURL(url);

            console.log('Code downloaded successfully:', fileName);
        } catch (error) {
            console.error('Error downloading code:', error);
        }
    };

    // Keyboard shortcuts handlers
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

    // Initialize from localStorage
    useEffect(() => {
        console.log('Initializing from localStorage');

        // Load saved theme
        const savedTheme = localStorage.getItem("editorTheme");
        if (savedTheme) {
            setEditorTheme(savedTheme);
        } else {
            setEditorTheme("vs-dark");
            localStorage.setItem("editorTheme", "vs-dark");
        }

        // Load saved language and its code
        const savedLanguage = localStorage.getItem("selectedLanguage");
        console.log('Saved language from localStorage:', savedLanguage);

        if (savedLanguage) {
            // Set initial language state
            setLanguage(savedLanguage);
            setLanguageVersion(LANGUAGES[savedLanguage].version);
            setExtension(LANGUAGES[savedLanguage].extension);

            // Load saved code for the language
            const savedCode = loadSavedCode(savedLanguage);
            console.log('Setting initial code:', savedCode);
            setUserCode(savedCode);
        } else {
            // Set default language and its code
            const defaultLanguage = 'cpp';
            console.log('No saved language found, using default:', defaultLanguage);
            setLanguage(defaultLanguage);
            setLanguageVersion(LANGUAGES[defaultLanguage].version);
            setExtension(LANGUAGES[defaultLanguage].extension);
            setUserCode(LANGUAGES[defaultLanguage].helloWorld);
            localStorage.setItem("selectedLanguage", defaultLanguage);
        }

        // Load saved input
        const savedCodeInput = localStorage.getItem("codeinput");
        if (savedCodeInput) {
            setUserInput(JSON.parse(savedCodeInput));
        }
    }, []);

    // Save input changes
    useEffect(() => {
        localStorage.setItem("codeinput", JSON.stringify(userInput));
    }, [userInput]);

    // Setup keyboard shortcuts
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
        handleLanguageChange,
        languageVersion,
        setLanguageVersion,
        extension,
        setExtension,

        // Code states
        userCode,
        handleCodeChange,
        userInput,
        setUserInput,
        output,
        setOutput,

        // Loading state
        loading,
        setLoading,

        // Handlers
        handleExecuteCode,

        // Code Downloader
        handleDownloadCode
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};