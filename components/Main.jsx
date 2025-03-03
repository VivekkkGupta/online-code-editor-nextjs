import React from 'react'
import Sidebar from './Sidebar'
import Codeeditor from './CodeEditor'
import Output from './Output'


function Main() {
    return (
        <div style={{ minHeight: `calc(100vh - 5rem)` }} className='w-full flex h-full'>
            <Sidebar />
            <Codeeditor />
            <Output />
        </div>
    )
}

export default Main

