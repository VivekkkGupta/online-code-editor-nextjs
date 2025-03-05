"use client";

import OutputHeader from './OutputHeader';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';

function Output() {

    return (
        <div className='flex flex-col h-full w-full'>
            {/* <OutputHeader /> */}

            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={50}>
                    <InputSection />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <OutputSection />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default Output
