import { Check, X } from "lucide-react";

interface PremiumListProps {
  title: string;
  features: { text: string; available: boolean }[];
}

export default function PremiumList({ title, features }: PremiumListProps) {
  return (
    <div
      className="w-80 rounded-2xl p-6 text-white text-center h-160"
      style={{
        background: "linear-gradient(163.3deg, #FF3B30 11.78%, #cc9600 158.85%)",
      }}
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-md">
            <span className="text-sm">{feature.text}</span>
            {feature.available ? (
              <Check className="text-white" size={20} />
            ) : (
              <X className="text-white" size={20} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
