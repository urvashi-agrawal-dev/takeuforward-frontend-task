import { format } from 'date-fns'

interface DayCellProps {
  date: Date
  isToday: boolean
  isWeekend: boolean
  isInRange: boolean
  isStart: boolean
  isEnd: boolean
  holiday?: string
  rangeClass?: string
  onSelect: () => void
}

export default function DayCell({
  date,
  isToday,
  isWeekend,
  isInRange,
  isStart,
  isEnd,
  holiday,
  rangeClass = '',
  onSelect
}: DayCellProps) {
  const dayNumber = format(date, 'd')
  
  // Determine the appropriate CSS classes
  let cellClasses = 'calendar-day relative border-r border-b border-gray-200 dark:border-gray-600 '
  
  // Add range classes for continuous highlighting
  if (rangeClass) {
    cellClasses += rangeClass + ' '
  }
  
  if (isToday) {
    cellClasses += 'today '
  } else if (isStart || isEnd) {
    cellClasses += 'selected '
  } else if (isInRange) {
    cellClasses += 'in-range '
  }
  
  if (isWeekend) {
    cellClasses += 'weekend '
  }
  
  return (
    <div className={cellClasses} onClick={onSelect}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-1">
        <span className={`text-sm ${
          isToday 
            ? 'font-bold text-blue-600 dark:text-blue-400' 
            : isWeekend 
              ? 'font-medium text-amber-700 dark:text-amber-300'
              : 'font-medium text-gray-700 dark:text-gray-300'
        }`}>
          {dayNumber}
        </span>
        
        {/* Holiday indicator */}
        {holiday && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-1 bg-red-500 rounded-full" title={holiday} />
          </div>
        )}
        
        {/* Start/End indicators */}
        {isStart && !isEnd && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" title="Start date" />
          </div>
        )}
        
        {isEnd && !isStart && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" title="End date" />
          </div>
        )}
        
        {/* Today indicator */}
        {isToday && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        )}
      </div>
      
      {/* Tooltip for holidays */}
      {holiday && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
          {holiday}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  )
}
