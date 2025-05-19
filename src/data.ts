import type { ReactNode } from "react"

// types
export type SenderType = "agent" | "customer"
export type RoleType = "user" | "assistant"

export type ChatMessage = {
  id: number
  sender: SenderType
  content: string
  time: string
  isNew?: boolean
  avatar?: string
  avatarColor?: string
}

export type AiMessage = {
  id: number
  role: RoleType
  content: string
  avatar?: string
  isNew?: boolean
  warning?: string
}

export type Suggestion = {
  id: number
  text: string
}

export type Conversation = {
  id: number
  name: string
  company?: string
  message?: string
  subtext?: string
  time: string
  avatar: string
  avatarColor: string
  isActive: boolean
  label?: string
  labelColor?: string
}

export type ConversationDetails = {
  team: ReactNode
  assignee: any
  [id: number]: {
    assignee: {
      name: string
      avatar: string
    }
    team: string
  }
}

// main data
export const conversations: Conversation[] = [
  {
    id: 1,
    name: "Luis",
    company: "Github",
    message: "Hey! I have a questio...",
    time: "45m",
    avatar: "L",
    avatarColor: "bg-blue-500",
    isActive: true,
  },
  {
    id: 2,
    name: "Ivan",
    company: "Nike",
    message: "Hi there, I have a qu...",
    time: "3m",
    avatar: "I",
    avatarColor: "bg-red-500",
    isActive: false,
    label: "Join",
    labelColor: "bg-yellow-300 text-black",
  },
  {
    id: 3,
    name: "Lead from New York",
    company: "",
    message: "Good morning, let me...",
    time: "45m",
    avatar: "L",
    avatarColor: "bg-blue-500",
    isActive: false,
  },
  {
    id: 4,
    name: "Booking API problems",
    company: "bug report",
    subtext: "Luis · Small Crafts",
    time: "45m",
    avatar: "BC",
    avatarColor: "bg-gray-800",
    isActive: false,
  },
  {
    id: 5,
    name: "Miracle",
    company: "Exemplary Bank",
    message: "Hey there, I'm here to...",
    time: "45m",
    avatar: "M",
    avatarColor: "bg-gray-500",
    isActive: false,
  },
]

export const initialSuggestions: Suggestion[] = [
  { id: 1, text: "How do I get a refund?" },
  { id: 2, text: "What's your return policy?" },
  { id: 3, text: "Can I exchange an item?" },
]

export const contextualSuggestions: Record<string, Suggestion[]> = {
  refund: [
    { id: 1, text: "What's the refund timeline?" },
    { id: 2, text: "Can I get a refund after 30 days?" },
    { id: 3, text: "Do you offer partial refunds?" },
  ],
  policy: [
    { id: 1, text: "What's your shipping policy?" },
    { id: 2, text: "Do you have a price match policy?" },
    { id: 3, text: "What's your privacy policy?" },
  ],
  exchange: [
    { id: 1, text: "Can I exchange for a different size?" },
    { id: 2, text: "Is there a fee for exchanges?" },
    { id: 3, text: "How long do I have to make an exchange?" },
  ],
}

export const conversationDetails: ConversationDetails = {
  1: {
    assignee: { name: "Brian Byrne", avatar: "BB" },
    team: "Unassigned",
  },
  2: {
    assignee: { name: "Sarah Johnson", avatar: "SJ" },
    team: "Sales",
  },
  3: {
    assignee: { name: "Michael Chen", avatar: "MC" },
    team: "Marketing",
  },
  4: {
    assignee: { name: "Alex Rodriguez", avatar: "AR" },
    team: "Support",
  },
  5: {
    assignee: { name: "Taylor Kim", avatar: "TK" },
    team: "Partnerships",
  },
  team: undefined,
  assignee: undefined
}

export const initialConversationMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      sender: "customer",
      content:
        "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
      time: "9min",
      avatar: "L",
      avatarColor: "bg-blue-500",
      isNew: false,
    },
    {
      id: 2,
      sender: "agent",
      content: "Let me just look into this for you, Luis.",
      time: "1min",
      isNew: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "customer",
      content: "Hi there, I have a question about your Nike Air Max shoes. Do you have them in size 10?",
      time: "3min",
      avatar: "I",
      avatarColor: "bg-red-500",
      isNew: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "customer",
      content: "Good morning, let me know if you have any special offers for New York customers.",
      time: "45min",
      avatar: "L",
      avatarColor: "bg-blue-500",
      isNew: false,
    },
  ],
  4: [
    {
      id: 1,
      sender: "customer",
      content: "I'm experiencing issues with your booking API. The endpoint keeps returning a 500 error.",
      time: "45min",
      avatar: "BC",
      avatarColor: "bg-gray-800",
      isNew: false,
    },
  ],
  5: [
    {
      id: 1,
      sender: "customer",
      content: "Hey there, I'm here to discuss our banking partnership opportunities.",
      time: "45min",
      avatar: "M",
      avatarColor: "bg-gray-500",
      isNew: false,
    },
    ],
}
