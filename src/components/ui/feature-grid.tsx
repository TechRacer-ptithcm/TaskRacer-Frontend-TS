import type React from "react"
import { Calendar, BarChart3, MessageSquare, Clock, FileText, Target, Grid3X3, Sparkles } from "lucide-react"

const features = [
  { name: "Tasks", icon: Grid3X3 },
  { name: "Chat", icon: MessageSquare },
  { name: "AI", icon: Sparkles },
  { name: "Sprints", icon: Clock },
  { name: "Time Tracking", icon: Clock },
  { name: "Calendar", icon: Calendar },
  { name: "Docs", icon: FileText },
  { name: "Goals", icon: Target },
  { name: "Dashboards", icon: BarChart3 },
]

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature) => (
        <FeatureCard key={feature.name} name={feature.name} Icon={feature.icon} />
      ))}
    </div>
  )
}

function FeatureCard({ name, Icon }: { name: string; Icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-2">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <span className="text-sm text-gray-600 text-center">{name}</span>
    </div>
  )
}

