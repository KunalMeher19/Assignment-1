import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Copy, ChevronDown } from "lucide-react"

interface AIChatPanelProps {
  messages: any[]
  hasAsked: boolean
  containerRef: React.RefObject<HTMLDivElement>
  onScroll: (atBottom: boolean) => void
  onAddToComposer: (text: string) => void
}

export default function AIChatPanel({
  messages,
  hasAsked,
  containerRef,
  onScroll,
  onAddToComposer,
}: AIChatPanelProps) {
  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const isScrolledToBottom =
        Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 10
      onScroll(isScrolledToBottom)
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto scroll-smooth"
      onScroll={handleScroll}
    >
      {hasAsked ? (
        <div className="flex flex-col p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.isNew ? "animate-message-appear" : ""}`}>
              {msg.role === "user" ? (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">You</div>
                    <div className="text-sm mt-1">{msg.content}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-black text-white p-1 rounded-md h-8 w-8 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.24 17.78 6 17.23 6 16.65C6 14.53 7.71 12.8 9.83 12.8H14.16C16.28 12.8 18 14.52 18 16.65C18 17.23 17.76 17.78 17.34 18.12C15.9 19.33 14.03 20 12 20Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Fin</div>
                    <div className="bg-indigo-100 rounded-lg p-3 text-sm mt-1">
                      {msg.content.split("\n").map((p: string, i: number) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {p}
                        </p>
                      ))}

                      {msg.warning && (
                        <div className="bg-yellow-100 border border-yellow-300 rounded p-2 mt-3 text-xs">
                          {msg.warning}
                        </div>
                      )}

                      <div className="mt-3 border-t pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center justify-center gap-1 text-blue-600"
                          onClick={() => onAddToComposer(msg.content)}
                        >
                          <Copy className="h-4 w-4" />
                          <span>Add to composer</span>
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-black text-white p-2 rounded-md mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.24 17.78 6 17.23 6 16.65C6 14.53 7.71 12.8 9.83 12.8H14.16C16.28 12.8 18 14.52 18 16.65C18 17.23 17.76 17.78 17.34 18.12C15.9 19.33 14.03 20 12 20Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-medium text-lg mb-1">Hi, I'm Fin AI Copilot</div>
            <div className="text-sm text-gray-500">Ask me anything about this conversation.</div>
          </div>
        </div>
      )}
    </div>
  )
}
