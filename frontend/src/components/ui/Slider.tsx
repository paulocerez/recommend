import * as React from "react"
import { cn } from "../../lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = 0, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      onValueChange?.(newValue)
    }

    // Calculate percentage for styling
    const percentage = ((value - min) / (max - min)) * 100

    // Generate dots for every 10%
    const dots = []
    for (let i = 0; i <= 100; i += 10) {
      dots.push(
        <div
          key={i}
          className="absolute w-1 h-1 bg-gray-400 rounded-full"
          style={{ left: `${i}%`, transform: 'translateX(-50%)' }}
        />
      )
    }

    return (
      <div className="relative w-full h-6 flex items-center">
        {/* Background track */}
        <div className="absolute w-full h-1 bg-gray-300 rounded-full" />
        
        {/* Filled track */}
        <div 
          className="absolute h-1 bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Dots at every 10% */}
        {dots}
        
        {/* Slider input */}
        <input
          type="range"
          ref={ref}
          className={cn(
            "absolute w-full h-6 bg-transparent appearance-none cursor-pointer slider-enhanced",
            className
          )}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
