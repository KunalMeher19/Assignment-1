import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "lucide-react"
import type { Conversation } from "../data"

interface Props {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}

export default function ConversationListItem({ conversation, isActive, onClick }: Props) {
  return (
    <div
      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${isActive ? "bg-gray-50" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 overflow-hidden">
          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=`} alt={conversation.name} />
          <AvatarFallback className={conversation.avatarColor || "bg-gray-200"}>
            {conversation.avatar || <User className="h-4 w-4 text-gray-500" />}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-medium text-sm truncate">{conversation.name}</div>
            <div className="text-xs text-gray-500">{conversation.time}</div>
          </div>

          {conversation.company && (
            <div className="text-xs text-gray-500 truncate">{conversation.company}</div>
          )}
          {conversation.message && <div className="text-sm truncate mt-1">{conversation.message}</div>}
          {conversation.subtext && (
            <div className="text-xs text-gray-500 truncate mt-1">{conversation.subtext}</div>
          )}
          {conversation.label && (
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${conversation.labelColor}`}
            >
              {conversation.label}
            </span>
          )}
        </div>

        {conversation.isActive && (
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
        )}
      </div>
    </div>
  )
}
