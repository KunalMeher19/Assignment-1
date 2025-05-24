// Helpdesk.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import SidebarLeft from "./components/SidebarLeft"
import ChatWindow from "./components/ChatWindow"
import SidebarRight from "./components/SidebarRight"
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from "./hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { ChevronDown, Clock, Send, Sparkles, X } from "lucide-react"
import { ChevronRight, ExternalLink } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./components/ui/tooltip"
import { User } from "lucide-react"
import { cn } from "./lib/utils";
import AIChatPanel from "./components/AIChatPanel"
import AIPromptInput from "./components/AIPromptInput"
import SuggestionList from "./components/SuggestionList"
import ConversationDetail from "./components/ConversationDetails"
import { initialConversationMessages, type AiMessage, type ChatMessage } from "./data"
import { conversations as defaultConversations, initialSuggestions, contextualSuggestions, conversationDetails as detailsData } from "./data"


export default function App() {
  const [activeConversation, setActiveConversation] = useState(defaultConversations[0])
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)
  const [mobileView, setMobileView] = useState<"tickets" | "chat" | "ai">("tickets");

  const isMobile = useIsMobile()

  const [chatInput, setChatInput] = useState("")
  const [chatInputCollapsed, setChatInputCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("tickets")
  const [activeRightTab, setActiveRightTab] = useState("copilot")
  const [currentSuggestions, setCurrentSuggestions] = useState(initialSuggestions)

  const [conversationMessages, setConversationMessages] = useState<Record<number, ChatMessage[]>>(initialConversationMessages)
  const [chatMessages, setChatMessages] = useState(conversationMessages[defaultConversations[0].id] || [])
  const [aiInput, setAiInput] = useState("")
  const [aiConversations, setAiConversations] = useState<Record<number, AiMessage[]>>({})
  const [aiConversation, setAiConversation] = useState<AiMessage[]>([])
  const [hasAskedAiMap, setHasAskedAiMap] = useState<Record<number, boolean>>({})
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right">("right");
  const [hasAskedAi, setHasAskedAi] = useState(false);


  const chatContainerRef = useRef<HTMLDivElement>(null)
  const aiChatContainerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isAiChatAtBottom, setIsAiChatAtBottom] = useState(true)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection("left");
      if (mobileView === "tickets") setMobileView("chat");
      else if (mobileView === "chat") setMobileView("ai");
      else if (mobileView === "ai") setMobileView("tickets");
    },
    onSwipedRight: () => {
      setSwipeDirection("right");
      if (mobileView === "ai") setMobileView("chat");
      else if (mobileView === "chat") setMobileView("tickets");
      else if (mobileView === "tickets") setMobileView("ai");
    },
    delta: 50
  });


  const handleScroll = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current
      const isScrolledToBottom =
        Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 10
      setIsAtBottom(isScrolledToBottom)
    }
  }
  const aiHandleScroll = () => {
    if (aiChatContainerRef.current) {
      const container = aiChatContainerRef.current
      const isScrolledToBottom =
        Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 10
      setIsAtBottom(isScrolledToBottom)
    }
  }
  const onSubmitChat = () => {
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

  useEffect(() => {
    const container = aiChatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [aiConversation])

  // -- Effects & Handlers omitted for brevity --

  return (
    <>
      {!isMobile && (
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
              setActiveConversation={setActiveConversation}
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
              setChatInput={setChatInput}
              setAiConversation={setAiConversation}
              aiInput={aiInput}
              setAiInput={setAiInput}
              onSubmitAI={() => {
                if (!aiInput.trim()) return

                const userMsg = {
                  id: Date.now(),
                  role: "user" as const,
                  content: aiInput,
                  isNew: true,
                }

                const assistantMsg = {
                  id: Date.now() + 1,
                  role: "assistant" as const,
                  content: "Here's a response from the AI based on your question.",
                  isNew: true,
                }

                // Add user message immediately
                const userOnly = [...aiConversation, userMsg]
                setAiConversation(userOnly)
                setAiConversations((prev) => ({
                  ...prev,
                  [activeConversation.id]: userOnly,
                }))

                setHasAskedAi(true)
                setHasAskedAiMap((prev) => ({
                  ...prev,
                  [activeConversation.id]: true,
                }))

                setAiInput("")

                // Delay AI response by 1 second
                setTimeout(() => {
                  const updated = [...userOnly, assistantMsg]
                  setAiConversation(updated)
                  setAiConversations((prev) => ({
                    ...prev,
                    [activeConversation.id]: updated,
                  }))

                  // Optional: remove animation flag after response
                  setTimeout(() => {
                    setAiConversation((prev) =>
                      prev.map((msg) => ({ ...msg, isNew: false }))
                    )
                  }, 300)
                }, 1000)
              }}
              hasAskedAi={hasAskedAi}
              currentSuggestions={currentSuggestions}
              conversationDetails={detailsData[activeConversation.id]}
              aiChatContainerRef={aiChatContainerRef}
              onScrollAI={setIsAiChatAtBottom}
              setMobileView={setMobileView}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="max-h-screen">
          <div className=" w-full rounded-xl h-14 align-middle bg-gray-400 dark:bg-slate-900 border-t flex justify-around p-5">
            <button onClick={() => setMobileView("tickets")} className={cn("relative px-4 ", mobileView === "tickets" && "text-blue-500 font-bold")}>
              🎟️
              {mobileView === "tickets" && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2  w-6 h-1  rounded-full bg-blue-500 mt-1" />
              )}
            </button>
            <button onClick={() => setMobileView("chat")} className={cn("relative px-4", mobileView === "chat" && "text-blue-500 font-bold")}>
              💬
              {mobileView === "chat" && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-blue-500 mt-1" />
              )}
            </button>
            <button onClick={() => setMobileView("ai")} className={cn("relative px-4", mobileView === "ai" && "text-blue-500 font-bold")}>
              🤖
              {mobileView === "ai" && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-blue-500 mt-1" />
              )}
            </button>
          </div>

          <AnimatePresence>
            <div {...swipeHandlers} className={cn("flex-1 max-h-screen overflow-hidden", isMobile ? "flex flex-col" : "grid grid-cols-12 gap-2")}>

              {(mobileView === "tickets") && (
                <motion.div
                  key="tickets"
                  initial={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: swipeDirection === "left" ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    isMobile ? "w-full" : "lg:col-span-3",
                    "p-4 flex flex-col",
                    // isDark ? "bg-slate-700" : "bg-gray-100"
                  )}
                  style={{
                    // Fill available vertical space in grid/flex layouts
                    flex: "1 1 0%",
                    minHeight: "95vh",
                    maxHeight: "95vh",
                    overflowY: "auto"
                  }}
                >
                  <div className="flex-1 overflow-auto pt-5">
                    {defaultConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${activeConversation.id === conversation.id ? "bg-gray-50" : ""
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
                          setMobileView("chat")
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
                </motion.div>
              )}

              {(mobileView === "chat") && (
                <motion.div
                  key="chat"
                  initial={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: swipeDirection === "left" ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    isMobile ? "w-full" : "lg:col-span-6",
                    "p-4 flex flex-col",
                  )}
                  style={{
                    // Fill available vertical space in grid/flex layouts
                    flex: "1 1 0%",
                    minHeight: "95vh",
                    maxHeight: "95vh",
                    overflowY: "auto",
                  }}
                >
                  {/* <div className="flex flex-col"> */}
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-semibold">{activeConversation.name}</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setChatInput("")
                          setMobileView("tickets")
                        }}
                      >
                        Close
                      </Button>
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
                        className={`flex gap-3 ${message.sender === "agent" ? "justify-end" : ""} ${message.isNew ? "animate-message-appear" : ""
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
                  <div className="flex-end border-t">
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
                  {/* </div> */}
                </motion.div>
              )}

              {(mobileView === "ai") && (
                <motion.div
                  key="ai"
                  initial={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: swipeDirection === "left" ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    isMobile ? "w-full" : "lg:col-span-6",
                    "p-4 flex flex-col",
                  )}
                  style={{
                    // Fill available vertical space in grid/flex layouts
                    flex: "1 1 0%",
                    minHeight: "95vh",
                    maxHeight: "95vh",
                    overflowY: "auto",
                  }}
                >
                  <>
                    <div className="flex items-center border-b"
                      onScroll={aiHandleScroll}>
                      <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeRightTab === "copilot" ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-700"
                          }`}
                        onClick={() => setActiveRightTab("copilot")}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        <span>Copilot</span>
                      </div>
                      <div
                        className={`px-4 py-3 cursor-pointer ${activeRightTab === "details" ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-700"
                          }`}
                        onClick={() => setActiveRightTab("details")}
                      >
                        Details
                      </div>
                      <div className="ml-auto flex items-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col relative overflow-auto">
                      {activeRightTab === "copilot" ? (
                        <>
                          <AIChatPanel
                            messages={aiConversation}
                            hasAsked={hasAskedAi}
                            containerRef={aiChatContainerRef}
                            onScroll={setIsAiChatAtBottom}
                            setChatInput={setChatInput}
                            setMobileView={setMobileView}
                          />
                          <SuggestionList
                            suggestions={currentSuggestions}
                            setAiInput={setAiInput}
                          />
                          <AIPromptInput
                            input={aiInput}
                            setInput={setAiInput}
                            onSubmit={() => {
                              if (!aiInput.trim()) return

                              const userMsg = {
                                id: Date.now(),
                                role: "user" as const,
                                content: aiInput,
                                isNew: true,
                              }

                              const assistantMsg = {
                                id: Date.now() + 1,
                                role: "assistant" as const,
                                content: "Here's a response from the AI based on your question.",
                                isNew: true,
                              }

                              // Add user message immediately
                              const userOnly = [...aiConversation, userMsg]
                              setAiConversation(userOnly)
                              setAiConversations((prev) => ({
                                ...prev,
                                [activeConversation.id]: userOnly,
                              }))

                              setHasAskedAi(true)
                              setHasAskedAiMap((prev) => ({
                                ...prev,
                                [activeConversation.id]: true,
                              }))

                              setAiInput("")

                              // Delay AI response by 1 second
                              setTimeout(() => {
                                const updated = [...userOnly, assistantMsg]
                                setAiConversation(updated)
                                setAiConversations((prev) => ({
                                  ...prev,
                                  [activeConversation.id]: updated,
                                }))

                                // Optional: remove animation flag after response
                                setTimeout(() => {
                                  setAiConversation((prev) =>
                                    prev.map((msg) => ({ ...msg, isNew: false }))
                                  )
                                }, 300)
                              }, 1000)
                            }}
                          />
                        </>

                      ) : (
                        <ConversationDetail details={detailsData[activeConversation.id]} />
                      )}
                    </div>
                    {/* </div> */}
                  </>
                </motion.div>
              )}

            </div>
          </AnimatePresence>
        </div>
      )}
    </>
  )
}

