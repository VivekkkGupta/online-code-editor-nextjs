"use client";

import React, { useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { useAppContext } from '@/contexts/AppContext';

function CodeEditorInput() {
    const { language, editorTheme, userCode, setUserCode } = useAppContext()

    const handleEditorChange = (newValue) => {
        setUserCode(newValue);
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <Editor
                height="85vh"
                theme={editorTheme}
                language={language}
                value={userCode}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditorInput