"use client";

import OutputHeader from './OutputHeader';
import OutputDisplay from './OutputDisplay';

function Output() {

    return (
        <div className='w-[40vw] flex flex-col h-full'>
            <OutputHeader />
            <OutputDisplay />
        </div>
    )
}

export default Output
