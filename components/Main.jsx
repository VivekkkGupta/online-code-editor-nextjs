'use client'
import Codeeditor from "./CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import InputOutputSection from "./InputOutputSection";
import LeftSidebarSection from "./LeftSidebarSection";
import AiSection from "./AI/AiSection";
import { useAppContext } from "@/contexts/AppContext";

function Main() {

  const { aiChatOpen } = useAppContext()

  return (
    <div
      style={{ height: `calc(100vh - 5rem)` }}
      className="w-full flex"
    >
      <LeftSidebarSection />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <Codeeditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>
          <InputOutputSection />
        </ResizablePanel>
        <ResizableHandle />
        {
          aiChatOpen && (
            <ResizablePanel defaultSize={30}>
              <AiSection />
            </ResizablePanel>
          )
        }
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
