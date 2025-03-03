import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useTheme } from 'next-themes';

function Editortheme() {
    const { editorTheme, setEditorTheme} = useAppContext();
    const { theme } = useTheme();

    useEffect(() => {
        const savedTheme = localStorage.getItem('editorTheme');
        if (savedTheme) {
            setEditorTheme(savedTheme);
        } else {
            setEditorTheme('vs');
        }
    }, [setEditorTheme]);

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        setEditorTheme(selectedTheme);
        localStorage.setItem('editorTheme', selectedTheme);
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
          
        </div>
    );
}

export default Editortheme;
