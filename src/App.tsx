// Helpdesk.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import SidebarLeft from "./components/SidebarLeft"
import ChatWindow from "./components/ChatWindow"
import SidebarRight from "./components/SidebarRight"
import { conversations as defaultConversations, initialSuggestions, contextualSuggestions, conversationDetails as detailsData } from "./data"

export default function Helpdesk() {
  const [activeConversation, setActiveConversation] = useState(defaultConversations[0])
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)

  const [chatInput, setChatInput] = useState("")
  const [chatInputCollapsed, setChatInputCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("conversation")
  const [activeRightTab, setActiveRightTab] = useState("details")
  const [aiInput, setAiInput] = useState("")
  const [currentSuggestions, setCurrentSuggestions] = useState(initialSuggestions)

  const [conversationMessages, setConversationMessages] = useState({})
  const [chatMessages, setChatMessages] = useState([])
  const [aiConversations, setAiConversations] = useState({})
  const [aiConversation, setAiConversation] = useState([])
  const [hasAskedAiMap, setHasAskedAiMap] = useState({})
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
          onSubmitChat={() => {}} // Placeholder
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
          onSubmitAI={() => {}} // Placeholder
          hasAskedAi={hasAskedAi}
          currentSuggestions={currentSuggestions}
          onSuggestionClick={() => {}}
          conversationDetails={detailsData[activeConversation.id]}
          aiChatContainerRef={aiChatContainerRef}
          onScrollAI={setIsAiChatAtBottom}
        />
      </div>
    </div>
  )
}
