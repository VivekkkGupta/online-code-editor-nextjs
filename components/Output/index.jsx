"use client";

import OutputHeader from './OutputHeader';
import OutputDisplay from './OutputDisplay';

function Output() {

    return (
        <div className='flex flex-col h-full w-full'>
            <OutputHeader />
            <OutputDisplay />
        </div>
    )
}

export default Output
