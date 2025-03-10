"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import RenderMessage from "./RenderMessage";
import generateResponse from "@/apis/OpenAI/open-ai-api-call";
import { useAppContext } from "@/contexts/AppContext";
import { Skeleton } from "../ui/skeleton";

function AiSection() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  const { language, userCode } = useAppContext();
  // State management
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [codeContext, setCodeContext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState({});
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am your AI Assistant, How may I help you?",
      sender: "AI",
    },
  ]);

  // Message sending handler
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    try {
      setIsLoading(true);
      // Add user message
      setMessages((prev) => [...prev, { text: inputText, sender: "User" }]);
      setInputText("");

      // Get AI response
      const finalPrompt = `
Programming Language: ${language}
code: ${codeContext ? `${userCode}` : ""} 
Input prompt: ${inputText}
      `;
      //   console.log(finalPrompt);
      const aiResponse = await generateResponse(finalPrompt);
      setMessages((prev) => [...prev, { text: aiResponse, sender: "AI" }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "AI",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border-l">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-2xl font-semibold">Chat with AI</h2>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full w-full">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <RenderMessage
                key={index}
                message={message}
                index={index}
                copyStatus={copyStatus}
                setCopyStatus={setCopyStatus}
              />
            ))}

            {isLoading && (
              <div className="space-y-2">
                <div className="animate-pulse text-xs text-gray-300">
                  Thinking...
                </div>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Section */}
      <div className="border-t p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="providecontext"
              checked={codeContext}
              onClick={() => setCodeContext((prev) => !prev)}
            />
            <label
              htmlFor="providecontext"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Provide Code Context
            </label>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              chatgpt-4o-mini
            </span>
            <Button
              onClick={sendMessage}
              disabled={isLoading}
              variant="default"
              size="sm"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          placeholder="Enter text to get code"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
}

export default AiSection;
