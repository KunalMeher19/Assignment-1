import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface ChatMessageProps {
  message: {
    id: number
    sender: "agent" | "customer"
    content: string
    time: string
    isNew?: boolean
    avatar?: string
    avatarColor?: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAgent = message.sender === "agent"

  return (
    <div
      className={`flex gap-3 ${isAgent ? "justify-end" : ""} ${
        message.isNew ? "animate-message-appear" : ""
      }`}
    >
      {/* Avatar only for customer */}
      {!isAgent && (
        <Avatar className={`h-8 w-8 ${message.avatarColor || "bg-blue-500"} text-white`}>
          <AvatarFallback>{message.avatar || "C"}</AvatarFallback>
        </Avatar>
      )}

      <div className="max-w-[80%]">
        <div
          className={`${isAgent ? "bg-blue-100" : "bg-gray-200"} rounded-lg p-3 text-sm`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isAgent ? "flex items-center justify-end gap-1" : ""
          }`}
        >
          {message.time}
          {isAgent && (
            <>
              <span>· Seen</span>
              <Avatar className="h-5 w-5">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
