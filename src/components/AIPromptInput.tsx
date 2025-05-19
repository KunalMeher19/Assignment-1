import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

interface AIPromptInputProps {
  input: string
  setInput: (val: string) => void
  onSubmit: () => void
}

export default function AIPromptInput({ input, setInput, onSubmit }: AIPromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="p-4 border-t bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="relative"
      >
        <div className="flex items-center bg-white rounded-lg border overflow-hidden">
          <Input
            placeholder="Ask a question..."
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-3 pr-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </form>
    </div>
  )
}
