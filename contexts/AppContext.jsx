"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../constants/constants';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Load the language from localStorage or default to C++
        return localStorage.getItem('selectedLanguage') || 'cpp';
    });
    const [boilerPlate, setBoilerPlate] = useState(LANGUAGES[language].helloWorld); // Set initial boilerplate based on language
    const [extension, setExtension] = useState(LANGUAGES[language].extension);

    const [editorTheme, setEditorTheme] = useState('light');

    // Update boilerPlate whenever the language changes
    useEffect(() => {
        setBoilerPlate(LANGUAGES[language].helloWorld);
        localStorage.setItem('selectedLanguage', language); // Save the selected language to localStorage
    }, [language]);

    const values = {
        language, setLanguage, boilerPlate, editorTheme, setEditorTheme, extension, setExtension
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}