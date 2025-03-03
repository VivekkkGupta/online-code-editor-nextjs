"use client";

import React from 'react'
import { SiCplusplus, SiPython, SiJavascript } from "react-icons/si";
import { LiaJava } from "react-icons/lia";
import { useAppContext } from '@/contexts/AppContext';
import { LANGUAGES } from '@/constants/constants';

function Sidebar() {
    const { language, setLanguage, setBoilerPlate, setExtension } = useAppContext();

    const handleLanguageChange = (language) => {
        setLanguage(language);
        setBoilerPlate(LANGUAGES[language].helloWorld);
        setExtension(LANGUAGES[language].extension)
        localStorage.setItem('selectedLanguage', language);
    }

    return (
        <div className='w-[6%] flex flex-col items-center gap-4 py-10 border-r'>
            <div className={`${language === 'cpp' ? "bg-white text-black" : ""} flex items-center justify-center w-[2rem] h-[2rem] border-1 cursor-pointer`} onClick={() => handleLanguageChange('cpp')}>
                <SiCplusplus className='text-xl' />
            </div>
            <div className={`${language === 'python' ? "bg-white text-black" : ""} flex items-center justify-center w-[2rem] h-[2rem] border-1 cursor-pointer`} onClick={() => handleLanguageChange('python')}>
                <SiPython className='text-xl' />
            </div>
            <div className={`${language === 'javascript' ? "bg-white text-black" : ""} flex items-center justify-center w-[2rem] h-[2rem] border-1 cursor-pointer`} onClick={() => handleLanguageChange('javascript')}>
                <SiJavascript className='text-xl' />
            </div>
            <div className={`${language === 'java' ? "bg-white text-black" : ""} flex items-center justify-center w-[2rem] h-[2rem] border-1 cursor-pointer`} onClick={() => handleLanguageChange('java')}>
                <LiaJava className='text-2xl' />
            </div>
        </div>
    )
}

export default Sidebar
