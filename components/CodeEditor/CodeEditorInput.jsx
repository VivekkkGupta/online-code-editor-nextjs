"use client";

import Editor from '@monaco-editor/react';
import { useAppContext } from "@/contexts/AppContext";

function CodeEditorInput() {

    const { language, editorTheme, userCode, handleCodeChange } = useAppContext();

    return <div className="w-full h-[calc(100vh-9rem)] flex items-center justify-center">
        <Editor
            height="100%"
            theme={editorTheme}
            language={language}
            value={userCode}
            onChange={handleCodeChange}
        />
    </div>;
}

export default CodeEditorInput;
