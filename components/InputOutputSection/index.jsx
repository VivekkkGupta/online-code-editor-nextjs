"use client";

import InputSection from './InputSection';
import OutputSection from './OutputSection';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';

function InputOutputSection() {

    return (
        <div className='flex flex-col h-full w-full'>
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

export default InputOutputSection
