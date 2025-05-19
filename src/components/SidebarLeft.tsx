import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { ConversationType } from "../data"

interface SidebarLeftProps {
  conversations: ConversationType[]
  activeConversation: ConversationType
  setActiveConversation: (conv: ConversationType) => void
  chatMessages: any[]
  aiConversation: any[]
  hasAskedAi: boolean
  setChatMessages: (msgs: any[]) => void
  setAiConversation: (msgs: any[]) => void
  setHasAskedAi: (asked: boolean) => void
  conversationMessages: Record<number, any[]>
  setConversationMessages: (msgs: Record<number, any[]>) => void
  aiConversations: Record<number, any[]>
  setAiConversations: (convs: Record<number, any[]>) => void
  hasAskedAiMap: Record<number, boolean>
  setHasAskedAiMap: (map: Record<number, boolean>) => void
  collapsed: boolean
  setCollapsed: (b: boolean) => void
}

export default function SidebarLeft({
  conversations,
  activeConversation,
  setActiveConversation,
  chatMessages,
  aiConversation,
  hasAskedAi,
  setChatMessages,
  setAiConversation,
  setHasAskedAi,
  conversationMessages,
  setConversationMessages,
  aiConversations,
  setAiConversations,
  hasAskedAiMap,
  setHasAskedAiMap,
  collapsed,
  setCollapsed,
}: SidebarLeftProps) {
  return (
    <>
      <div
        className={`border-r flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "w-0 opacity-0 overflow-hidden" : "w-72"
        }`}
      >
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Your inbox</h2>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setCollapsed(true)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                activeConversation.id === conversation.id ? "bg-gray-50" : ""
              }`}
              onClick={() => {
                setConversationMessages({
                  ...conversationMessages,
                  [activeConversation.id]: chatMessages,
                })
                setAiConversations({
                  ...aiConversations,
                  [activeConversation.id]: aiConversation,
                })
                setHasAskedAiMap({
                  ...hasAskedAiMap,
                  [activeConversation.id]: hasAskedAi,
                })

                setActiveConversation(conversation)
                setChatMessages(conversationMessages[conversation.id] || [])
                setAiConversation(aiConversations[conversation.id] || [])
                setHasAskedAi(hasAskedAiMap[conversation.id] || false)
              }}
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
                {conversation.isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand sidebar button */}
      {collapsed && (
        <Button
          variant="outline"
          size="sm"
          className="absolute left-2 top-16 h-8 w-8 p-0 rounded-full shadow-md z-10"
          onClick={() => setCollapsed(false)}
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
        </Button>
      )}
    </>
  )
}
