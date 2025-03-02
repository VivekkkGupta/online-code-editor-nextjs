"use client";

import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Editortheme from './Editortheme';
import { useAppContext } from '@/contexts/AppContext';


function Codeeditor() {

    const { editorTheme } = useAppContext();
    const handleEditorChange = (value, event) => {
        // Handle the change in editor content
        console.log(value);
    };


    const { language, boilerPlate, extension } = useAppContext()

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex justify-between  h-12 w-full border-b'>
                <div className='border-r flex px-5 items-center'>
                    main{extension}
                </div>
                <div className='flex items-center py-2 px-10 justify-end gap-2'>
                    <Editortheme />
                    <button className='flex items-center justify-center h-10 hover:bg-gray-800 px-4 py-2 transition duration-200 gap-2 border-1 cursor-pointer'>
                        <FaShareAlt />
                        Share
                    </button>
                    <button className='ml-10 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2 cursor-pointer'>
                        <FaPlay />
                        Run
                    </button>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Editor
                    height="30rem"
                    theme={editorTheme}
                    defaultLanguage="c++"
                    defaultValue={boilerPlate}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    );
}

export default Codeeditor;
