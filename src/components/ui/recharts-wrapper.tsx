
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

interface RechartsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const RechartsWrapper = forwardRef<HTMLDivElement, RechartsWrapperProps>(
  ({ className, children, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && <h4 className="text-sm font-medium leading-none">{title}</h4>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="h-full">
          {children}
        </div>
      </div>
    )
  }
)
RechartsWrapper.displayName = "RechartsWrapper"

export { RechartsWrapper }
