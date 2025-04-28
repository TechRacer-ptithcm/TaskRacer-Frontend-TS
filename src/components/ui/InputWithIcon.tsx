import * as React from "react";
import { Input } from "@/components/ui/input";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform">
            {icon}
          </div>
        )}
        <Input
          type={type}
          className={`bg-background focus:ring-ring h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
