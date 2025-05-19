import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronDown, Users } from "lucide-react"
import type { ConversationDetails } from "../data"

interface Props {
  details: ConversationDetails
}

export default function ConversationDetails({ details }: Props) {
  const sections = [
    "USER DATA",
    "CONVERSATION ATTRIBUTES",
    "COMPANY DETAILS",
    "SALESFORCE",
    "STRIPE",
    "JIRA FOR TICKETS",
  ]

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-auto">
      <div className="p-4 space-y-4">
        {/* Assignee section */}
        <div className="flex items-center justify-between">
          <div className="text-gray-500">Assignee</div>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src="/placeholder.svg?height=20&width=20"
                alt={details.assignee.name}
              />
              <AvatarFallback>{details.assignee.avatar}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{details.assignee.name}</span>
          </div>
        </div>

        {/* Team section */}
        <div className="flex items-center justify-between">
          <div className="text-gray-500">Team</div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">{details.team}</span>
          </div>
        </div>

        {/* Links section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-500">LINKS</div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>

          <div className="space-y-3">
            {["Tracker ticket", "Back-office tickets", "Side conversations"].map((label, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm" />
                  <span className="text-sm">{label}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4V12M4 8H12"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Collapsed sections */}
        {sections.map((section) => (
          <div key={section} className="flex items-center justify-between py-1">
            <div className="text-xs font-semibold text-gray-500">{section}</div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
