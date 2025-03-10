import { Check, Copy } from "lucide-react";
import React from "react";

function RenderMessage({ message, index, copyStatus, setCopyStatus }) {
  // Copy handler
  const handleCopy = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus((prev) => ({ ...prev, [messageId]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [messageId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Handle AI messages with potential code blocks
  if (message.sender === "AI") {
    const parts = message.text.split(/```(\w*)\n([\s\S]*?)```/);

    if (parts.length > 1) {
      // parts[0]: text before code block
      // parts[1]: language
      // parts[2]: code
      // parts[3]: text after code block (if any)
      return (
        <div className="flex flex-col space-y-2 text-xs">
          {/* Text before code block */}
          {parts[0] && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted text-foreground">
                {parts[0]}
              </div>
            </div>
          )}

          {/* Code block */}
          <div className="bg-muted rounded-lg p-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">
                {parts[1] || "Language"}
              </span>
              <button
                onClick={() => handleCopy(parts[2], index)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {copyStatus[index] ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-2 rounded bg-background">
              <code className="font-mono">{parts[2]}</code>
            </pre>
          </div>

          {/* Text after code block */}
          {parts[3] && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted text-foreground">
                {parts[3]}
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  // Regular message rendering (for user messages or AI messages without code)
  return (
    <div
      className={`flex ${
        message.sender === "User" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`text-xs max-w-[80%] rounded-lg px-3 py-2 ${
          message.sender === "User"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default RenderMessage;
