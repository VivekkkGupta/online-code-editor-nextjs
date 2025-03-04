"use client";
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Editortheme from './Editortheme';
import { useAppContext } from '@/contexts/AppContext';
import { useState } from "react";

function CodeEditorHeader() {

    const { extension, handleExecuteCode, loading } = useAppContext()

    const [shareStatus, setShareStatus] = useState('Share') // Add this state

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShareStatus('Copied!');

            // Reset status after 2 seconds
            setTimeout(() => {
                setShareStatus('Share');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
            setShareStatus('Failed to copy');
        }
    }

    return (
        <div className='flex justify-between h-[4rem] w-full border-b'>
            <div className='border-r flex px-5 items-center'>
                main{extension}
            </div>
            <div className='flex items-center py-2 px-10 justify-end gap-2'>
                <Editortheme />
                <button
                    className='flex items-center justify-center h-10 hover:bg-gray-800 px-4 py-2 transition duration-200 gap-2 border-1 cursor-pointer'
                    onClick={handleShare}
                >
                    <FaShareAlt />
                    {shareStatus}
                </button>
                <button
                    onClick={handleExecuteCode}
                    className='h-10 ml-10 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2 cursor-pointer'>

                    {
                        loading ? (
                            <div className="w-8 h-8 rounded-full border-4 animate-spin border-t-blue-700 border-blue-300">
                            </div>
                        ) : (
                            <>
                                <FaPlay />
                                Run
                                (ctrl + s)
                            </>
                        )
                    }

                </button>
            </div>
        </div>
    )
}

export default CodeEditorHeader;