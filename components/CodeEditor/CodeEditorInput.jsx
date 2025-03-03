"use client";

import React, { useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { useAppContext } from '@/contexts/AppContext';



function CodeEditorInput() {
    const { language, editorTheme, boilerPlate, handleEditorChange } = useAppContext()

    // useEffect(() => {
    //     console.log("Language changed to ", language)
    //     console.log("Boiler Plate: ", boilerPlate)
    // }, [language])

    return (
        <div className='w-full flex items-center justify-center'>
            <Editor
                height="85vh"
                theme={editorTheme}
                language="c++"
                value={boilerPlate}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditorInput