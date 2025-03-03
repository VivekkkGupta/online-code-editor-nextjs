"use client";

import React from 'react'
import CodeEditorHeader from '@/components/CodeEditor/CodeEditorHeader';
import CodeEditorInput from '@/components/CodeEditor/CodeEditorInput';

function Codeeditor() {

    return (
        <div className='flex flex-col w-full h-full'>
            <CodeEditorHeader/>
            <CodeEditorInput/>
        </div>
    );
}

export default Codeeditor;
