import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronDown, Clock, Send, Sparkles, X } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip"

interface ChatWindowProps {
  activeConversation: any
  chatMessages: any[]
  chatInput: string
  setChatInput: (val: string) => void
  onSubmitChat: () => void
  chatInputCollapsed: boolean
  setChatInputCollapsed: (b: boolean) => void
  chatContainerRef: React.RefObject<HTMLDivElement>
  onScroll: (atBottom: boolean) => void
}

export default function ChatWindow({
  activeConversation,
  chatMessages,
  chatInput,
  setChatInput,
  onSubmitChat,
  chatInputCollapsed,
  setChatInputCollapsed,
  chatContainerRef,
  onScroll,
}: ChatWindowProps) {
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current
      const isScrolledToBottom =
        Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 10
      onScroll(isScrolledToBottom)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmitChat()
    }
  }

  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="font-semibold">{activeConversation.name}</div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <Button size="sm" variant="outline">Close</Button>
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-4 flex flex-col gap-4 scroll-smooth"
        onScroll={handleScroll}
      >
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === "agent" ? "justify-end" : ""} ${
              message.isNew ? "animate-message-appear" : ""
            }`}
          >
            {message.sender === "customer" && (
              <Avatar className={`h-8 w-8 ${message.avatarColor || "bg-blue-500"} text-white`}>
                <AvatarFallback>{message.avatar || "C"}</AvatarFallback>
              </Avatar>
            )}
            <div className="max-w-[80%]">
              <div className={`${message.sender === "agent" ? "bg-blue-100" : "bg-gray-200"} rounded-lg p-3 text-sm`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${message.sender === "agent" ? "text-right" : ""}`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="border-t">
        <div className="flex items-center justify-between p-3">
          <div
            className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer"
            onClick={() => setChatInputCollapsed(!chatInputCollapsed)}
          >
            <span>Chat</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${chatInputCollapsed ? "rotate-180" : ""}`} />
          </div>
          <div className="text-xs text-gray-500">Use ⌘K for shortcuts</div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${chatInputCollapsed ? "max-h-0 opacity-0" : "max-h-[300px] opacity-100"}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmitChat()
            }}
            className="bg-white rounded-lg border p-3 mx-3 mb-3"
          >
            <textarea
              placeholder="Type your message..."
              className="w-full resize-none text-sm min-h-[40px] focus:ring-0 border-0 bg-transparent"
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value)
                e.target.style.height = "auto"
                e.target.style.height = Math.min(200, e.target.scrollHeight) + "px"
              }}
              onKeyDown={handleKeyDown}
              rows={chatInput.split("\n").length || 1}
              style={{ height: chatInput ? "auto" : "40px" }}
            />

            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  😊
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Sparkles className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI suggestions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                {chatInput.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChatInput("")}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <Button
                  type="submit"
                  className="rounded-lg px-4 flex items-center gap-1"
                  disabled={!chatInput.trim()}
                >
                  Send
                  <Send className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
