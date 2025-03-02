import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext'; // Import the context
import { useTheme } from 'next-themes'; // Import useTheme to get the current theme
import { LANGUAGES } from '../constants/constants'; // Import LANGUAGES

function Editortheme() {
    const { editorTheme, setEditorTheme } = useAppContext(); // Get the editorTheme state and setter
    const { theme } = useTheme(); // Get the current theme
    const { language, setLanguage } = useAppContext(); // Get the language state and setter

    // Load the theme from localStorage when the component mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem('editorTheme');
        if (savedTheme) {
            setEditorTheme(savedTheme); // Set the theme from localStorage
        } else {
            setEditorTheme('vs'); // Set default theme if none is saved
        }
    }, [setEditorTheme]); // Dependency array includes setEditorTheme

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        setEditorTheme(selectedTheme); // Update the editorTheme state
        localStorage.setItem('editorTheme', selectedTheme); // Save the selected theme to localStorage
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage); // Update the language state
        // Optionally, you can also set the file extension in localStorage or another state if needed
        localStorage.setItem('selectedLanguage', selectedLanguage); // Save the selected language to localStorage
    };

    return (
        <div className="flex space-x-4">
            <select
                name="editor-theme"
                id="editor-theme"
                value={editorTheme}
                onChange={handleThemeChange}
                className={`p-2 rounded border transition duration-200 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-600'
                    } `}
            >
                <option value="vs">Visual Studio Light</option>
                <option value="vs-dark">Visual Studio Dark</option>
                <option value="hc-black">High Contrast Black</option>
                <option value="monokai">Monokai</option>
                <option value="dracula">Dracula</option>
                <option value="solarized-light">Solarized Light</option>
                <option value="solarized-dark">Solarized Dark</option>
            </select>
            <select
                name="editor-language"
                id="editor-language"
                value={language}
                onChange={handleLanguageChange}
                className="p-2 rounded border"
            >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
            </select>
        </div>
    );
}

export default Editortheme;
