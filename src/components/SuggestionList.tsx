import { ChevronDown } from "lucide-react"
import type { Suggestion } from "../data"

interface SuggestionListProps {
  suggestions: Suggestion[]
  setAiInput: (val: string) => void
}

export default function SuggestionList({ suggestions, setAiInput }: SuggestionListProps) {

  return (
    <div className="relative">
      <div className="absolute bottom-[1px] right-4 z-50 group">
        <button className="bg-gradient-to-tl from-yellow-300 to-yellow-100 text-white p-2 rounded-full shadow-lg backdrop-blur-lg hover:scale-105 transition-transform">
          💡
        </button>
        <div className="absolute bottom-[110%] right-0 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-gray-300 dark:border-slate-700 rounded-lg shadow-xl opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-300 space-y-1 p-3">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => setAiInput(s.text)}
              className="text-sm w-full text-left bg-gray-100 dark:bg-slate-700 dark:text-white px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-slate-600"
            >
              {s.text}
            </button>
          ))}
        </div>
      </div>
    </div>

  )
}
