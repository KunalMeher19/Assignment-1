import { useRef } from "react"
import { Button } from "./ui/button"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import { Sparkles, Send, X } from "lucide-react"

interface Props {
  value: string
  setValue: (v: string) => void
  onSubmit: () => void
  onEmojiClick?: () => void
}

export default function ConversationInput({ value, setValue, onSubmit, onEmojiClick }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setValue(newText)

    // Resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(200, textareaRef.current.scrollHeight) + "px"
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="bg-white rounded-lg border p-3 mx-3 mb-3"
    >
      <textarea
        ref={textareaRef}
        placeholder="Type your message..."
        className="w-full resize-none border-0 bg-transparent p-0 focus:ring-0 text-sm min-h-[40px]"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={value.split("\n").length || 1}
        style={{ height: value ? "auto" : "40px" }}
      />

      <div className="flex items-center justify-between mt-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.preventDefault()
              onEmojiClick?.()
            }}
          >
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
          {value.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      setValue("")
                      if (textareaRef.current) {
                        textareaRef.current.style.height = "40px"
                      }
                    }}
                    aria-label="Clear message"
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
            disabled={!value.trim()}
          >
            Send
            <Send className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </form>
  )
}
