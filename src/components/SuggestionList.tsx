import { ChevronDown } from "lucide-react"
import type { Suggestion } from "../data"

interface SuggestionListProps {
  suggestions: Suggestion[]
  onSuggestionClick: (s: Suggestion) => void
}

export default function SuggestionList({ suggestions, onSuggestionClick }: SuggestionListProps) {
  
  return (
    <div className="group border-t bg-gray-100 transition-all duration-300 ease-in-out overflow-hidden hover:max-h-40 max-h-10">
      <div className="p-4 pb-0 group-hover:pb-4">
        <div className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
          <span>Suggested</span>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
        </div>

        <div className="flex flex-wrap gap-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
          {suggestions.map((sugg) => (
            <div
              key={sugg.id}
              className="bg-gray-200 text-gray-800 inline-block rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-gray-300"
              onClick={() => onSuggestionClick(sugg)}
            >
              💡 {sugg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
