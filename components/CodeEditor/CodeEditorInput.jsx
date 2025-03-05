"use client";

import Editor from '@monaco-editor/react';
import { useAppContext } from '@/contexts/AppContext';

function CodeEditorInput() {
    const { language, editorTheme, userCode, setUserCode } = useAppContext()

    const handleEditorChange = (newValue) => {
        setUserCode(newValue);
    };

    return (
        <div className='w-full h-[calc(100vh-9rem)] flex items-center justify-center'>
            <Editor
                height="100%"
                theme={editorTheme}
                language={language}
                value={userCode}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditorInput