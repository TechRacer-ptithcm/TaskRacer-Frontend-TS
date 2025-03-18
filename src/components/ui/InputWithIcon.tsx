import * as React from "react";
import { Input } from "@/components/ui/input";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
  }  

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          type={type}
          className={`h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
