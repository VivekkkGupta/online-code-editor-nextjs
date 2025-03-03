"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from '../constants/constants';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {

    const [language, setLanguage] = useState('cpp');
    const [boilerPlate, setBoilerPlate] = useState(LANGUAGES[language].helloWorld);
    const [extension, setExtension] = useState(LANGUAGES[language].extension);
    const [editorTheme, setEditorTheme] = useState('light');


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('selectedLanguage');
            if (storedLanguage) {
                setLanguage(storedLanguage);
                setBoilerPlate(LANGUAGES[language].helloWorld);
                setExtension(LANGUAGES[language].extension);
                // console.log( "Language stored: ",storedLanguage, "\nBoilerPlate : ", LANGUAGES[language].helloWorld,"\nExtension : ",LANGUAGES[language].extension)
            }
        }
    }, []);

    const values = {
        language, 
        setLanguage, 
        boilerPlate, 
        setBoilerPlate,
        editorTheme, 
        setEditorTheme, 
        extension, 
        setExtension
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}