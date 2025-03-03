"use client";
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Editortheme from './Editortheme';
import { useAppContext } from '@/contexts/AppContext';
import { executeCode } from "@/api/api";

function CodeEditorHeader() {

    const { extension, language,boilerPlate:SourceCode} = useAppContext()
    
    const handleExecuteCode= async()=>{
        console.log("click")
        try {
            const { response } = await executeCode(language,SourceCode);
            console.log(response)
        } catch (error) {
            console.log(response)
        }
    }

    return (
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
                <button
                onClick={handleExecuteCode}
                 className='ml-10 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2 cursor-pointer'>
                    <FaPlay />
                    Run
                </button>
            </div>
        </div>
    )
}

export default CodeEditorHeader;