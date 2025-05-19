import { ChevronRight, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import AIChatPanel from "./AIChatPanel"
import AIPromptInput from "./AIPromptInput"
import SuggestionList from "./SuggestionList"
import ConversationDetails from "./ConversationDetails"
import { ConversationDetailsType, SuggestionType } from "../data"

interface SidebarRightProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  collapsed: boolean
  setCollapsed: (b: boolean) => void
  aiConversation: any[]
  aiInput: string
  setAiInput: (val: string) => void
  onSubmitAI: () => void
  onSuggestionClick: (s: SuggestionType) => void
  hasAskedAi: boolean
  currentSuggestions: SuggestionType[]
  conversationDetails: ConversationDetailsType
  aiChatContainerRef: React.RefObject<HTMLDivElement>
  onScrollAI: (atBottom: boolean) => void
}

export default function SidebarRight({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  aiConversation,
  aiInput,
  setAiInput,
  onSubmitAI,
  hasAskedAi,
  currentSuggestions,
  onSuggestionClick,
  conversationDetails,
  aiChatContainerRef,
  onScrollAI,
}: SidebarRightProps) {
  return (
    <>
      <div
        className={`border-l flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "w-0 opacity-0 overflow-hidden" : "w-72"
        }`}
      >
        {/* Tabs */}
        <div className="flex items-center border-b">
          <div
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === "copilot" ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("copilot")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Copilot</span>
          </div>
          <div
            className={`px-4 py-3 cursor-pointer ${
              activeTab === "details" ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </div>
          <div className="ml-auto flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(true)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col relative overflow-auto">
          {activeTab === "details" ? (
            <ConversationDetails details={conversationDetails} />
          ) : (
            <>
              <AIChatPanel
                messages={aiConversation}
                hasAsked={hasAskedAi}
                containerRef={aiChatContainerRef}
                onScroll={onScrollAI}
                onAddToComposer={(text: string) => setAiInput(text)}
              />
              <SuggestionList
                suggestions={currentSuggestions}
                onSuggestionClick={onSuggestionClick}
              />
              <AIPromptInput
                input={aiInput}
                setInput={setAiInput}
                onSubmit={onSubmitAI}
              />
            </>
          )}
        </div>
      </div>

      {/* Expand button */}
      {collapsed && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-2 top-16 h-8 w-8 p-0 rounded-full shadow-md z-10"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
      )}
    </>
  )
}
