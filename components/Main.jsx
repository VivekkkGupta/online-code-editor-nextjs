import Sidebar from "./Sidebar";
import Codeeditor from "./CodeEditor";
import Output from "./Output";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Main() {
  return (
    <div
      style={{ minHeight: `calc(100vh - 5rem)` }}
      className="w-full flex h-full"
    >
      <Sidebar />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <Codeeditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <Output />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
