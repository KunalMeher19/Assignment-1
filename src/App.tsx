// Helpdesk.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import SidebarLeft from "./components/SidebarLeft"
import ChatWindow from "./components/ChatWindow"
import SidebarRight from "./components/SidebarRight"
import { initialConversationMessages, type AiMessage, type ChatMessage } from "./data"
import { conversations as defaultConversations, initialSuggestions, contextualSuggestions, conversationDetails as detailsData } from "./data"

export default function App() {
  const [activeConversation, setActiveConversation] = useState(defaultConversations[0])
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)

  const [chatInput, setChatInput] = useState("")
  const [chatInputCollapsed, setChatInputCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("conversation")
  const [activeRightTab, setActiveRightTab] = useState("details")
  const [currentSuggestions, setCurrentSuggestions] = useState(initialSuggestions)
  
  const [conversationMessages, setConversationMessages] = useState<Record<number, ChatMessage[]>>(initialConversationMessages)
  const [chatMessages, setChatMessages] = useState(conversationMessages[defaultConversations[0].id] || [])
  const [aiInput, setAiInput] = useState("")
  const [aiConversations, setAiConversations] = useState<Record<number, AiMessage[]>>({})
  const [aiConversation, setAiConversation] = useState<AiMessage[]>([])
  const [hasAskedAiMap, setHasAskedAiMap] = useState<Record<number, boolean>>({})
  const [hasAskedAi, setHasAskedAi] = useState(false)


  const chatContainerRef = useRef(null)
  const aiChatContainerRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isAiChatAtBottom, setIsAiChatAtBottom] = useState(true)

  // -- Effects & Handlers omitted for brevity --

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <div className="flex w-full max-w-6xl mx-auto my-4 rounded-xl overflow-hidden bg-white shadow-lg relative">
        <SidebarLeft
          activeConversation={activeConversation}
          conversations={defaultConversations}
          setActiveConversation={setActiveConversation}
          chatMessages={chatMessages}
          aiConversation={aiConversation}
          hasAskedAi={hasAskedAi}
          setChatMessages={setChatMessages}
          setAiConversation={setAiConversation}
          setHasAskedAi={setHasAskedAi}
          conversationMessages={conversationMessages}
          setConversationMessages={setConversationMessages}
          aiConversations={aiConversations}
          setAiConversations={setAiConversations}
          hasAskedAiMap={hasAskedAiMap}
          setHasAskedAiMap={setHasAskedAiMap}
          collapsed={leftSidebarCollapsed}
          setCollapsed={setLeftSidebarCollapsed}
        />

        <ChatWindow
          activeConversation={activeConversation}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSubmitChat={() => {
            if (!chatInput.trim()) return;

            const newMessage: ChatMessage = {
              id: Date.now(),
              sender: "agent",
              content: chatInput,
              time: "Just now",
              isNew: true,
            }

            const updated = [...chatMessages, newMessage]
            setChatMessages(updated)

            // Save this update under the current conversation
            setConversationMessages((prev) => ({
              ...prev,
              [activeConversation.id]: updated,
            }))

            setChatInput("")

            setTimeout(() => {
              setChatMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newMessage.id ? { ...msg, isNew: false } : msg
                )
              )
            }, 300)
          }}
          chatInputCollapsed={chatInputCollapsed}
          setChatInputCollapsed={setChatInputCollapsed}
          chatContainerRef={chatContainerRef}
          onScroll={setIsAtBottom}
        />

        <SidebarRight
          activeTab={activeRightTab}
          setActiveTab={setActiveRightTab}
          collapsed={rightSidebarCollapsed}
          setCollapsed={setRightSidebarCollapsed}
          aiConversation={aiConversation}
          aiInput={aiInput}
          setAiInput={setAiInput}
          onSubmitAI={() => {
            if (!aiInput.trim()) return

            const newUserMessage: AiMessage = {
              id: Date.now(),
              role: "user" as AiMessage["role"],
              content: aiInput,
              isNew: true,
            }

            const newAiMessage: AiMessage = {
              id: Date.now() + 1,
              role: "assistant" as AiMessage["role"],
              content: "Thanks for your question. Here's an answer from AI...",
              isNew: true,
            }

            const updated: AiMessage[] = [...aiConversation, newUserMessage, newAiMessage]
            setAiConversation(updated)
            setAiInput("")
            setHasAskedAi(true)

            setAiConversations((prev) => ({
              ...prev,
              [activeConversation.id]: updated,
            }))

            setHasAskedAiMap((prev) => ({
              ...prev,
              [activeConversation.id]: true,
            }))
          }}
          hasAskedAi={hasAskedAi}
          currentSuggestions={currentSuggestions}
          onSuggestionClick={() => { }}
          conversationDetails={detailsData[activeConversation.id]}
          aiChatContainerRef={aiChatContainerRef}
          onScrollAI={setIsAiChatAtBottom}
        />
      </div>
    </div>
  )
}
