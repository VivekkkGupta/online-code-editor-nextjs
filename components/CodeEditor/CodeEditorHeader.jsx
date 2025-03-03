"use client";
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Editortheme from './Editortheme';
import { useAppContext } from '@/contexts/AppContext';
import { LoaderCircle } from "lucide-react";

function CodeEditorHeader() {

    const { extension, handleExecuteCode, loading } = useAppContext()

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
                    className='w-25 h-10 ml-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2 cursor-pointer'>

                    {
                        loading ? (
                            <div className="w-8 h-8 rounded-full border-4 animate-spin border-t-blue-700 border-blue-300">
                            </div>
                        ) : (
                            <>
                                <FaPlay />
                                Run
                            </>
                        )
                    }

                </button>
            </div>
        </div>
    )
}

export default CodeEditorHeader;