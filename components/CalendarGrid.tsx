import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, isWeekend } from 'date-fns'
import { X } from 'lucide-react'
import DayCell from './DayCell'
import { DateRange } from './InteractiveWallCalendar'

interface CalendarGridProps {
  currentMonth: Date
  selectedRange: DateRange
  onDateSelect: (date: Date) => void
  onResetSelection: () => void
}

// Mock holidays data
const holidays: { [key: string]: string } = {
  '2024-01-01': 'New Year\'s Day',
  '2024-07-04': 'Independence Day',
  '2024-12-25': 'Christmas Day',
  '2024-10-31': 'Halloween',
  '2024-02-14': 'Valentine\'s Day',
}

export default function CalendarGrid({
  currentMonth,
  selectedRange,
  onDateSelect,
  onResetSelection
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Calculate starting day of the week (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = getDay(monthStart)
  
  // Create array of empty cells for days before month starts
  const emptyCells = Array(startDayOfWeek).fill(null)
  
  // Combine empty cells and month days
  const allCells = [...emptyCells, ...monthDays]
  
  // Check if a date is in the selected range
  const isInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false
    
    const dateMs = date.getTime()
    const startMs = selectedRange.start.getTime()
    const endMs = selectedRange.end.getTime()
    
    return dateMs >= startMs && dateMs <= endMs
  }
  
  // Check if a date is the start of selected range
  const isStart = (date: Date) => {
    return selectedRange.start && isSameDay(date, selectedRange.start)
  }
  
  // Check if a date is the end of selected range
  const isEnd = (date: Date) => {
    return selectedRange.end && isSameDay(date, selectedRange.end)
  }
  
  // Determine range styling for continuous highlighting
  const getRangeClass = (date: Date, index: number) => {
    if (!selectedRange.start || !selectedRange.end) return ''
    
    if (isStart(date) && isEnd(date)) return 'range-start range-end'
    if (isStart(date)) return 'range-start'
    if (isEnd(date)) return 'range-end'
    if (isInRange(date)) return 'range-continuous'
    
    return ''
  }
  
  // Get holiday for a specific date
  const getHoliday = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return holidays[dateKey]
  }
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="calendar-grid-printed">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        {(selectedRange.start || selectedRange.end) && (
          <button
            onClick={onResetSelection}
            className="flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-semibold py-2 border-b border-gray-200 dark:border-gray-600 ${
              index === 0 || index === 6
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-0">
        {allCells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square border-r border-b border-gray-100 dark:border-gray-700" />
          }
          
          const isDateToday = isToday(date)
          const isDateWeekend = isWeekend(date)
          const isDateInRange = isInRange(date)
          const isDateStart = isStart(date)
          const isDateEnd = isEnd(date)
          const holiday = getHoliday(date)
          const rangeClass = getRangeClass(date, index)
          
          return (
            <DayCell
              key={date.toISOString()}
              date={date}
              isToday={isDateToday}
              isWeekend={isDateWeekend}
              isInRange={isDateInRange}
              isStart={isDateStart}
              isEnd={isDateEnd}
              holiday={holiday}
              rangeClass={rangeClass}
              onSelect={() => onDateSelect(date)}
            />
          )
        })}
      </div>
      
      {/* Selection info */}
      {selectedRange.start && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="text-sm text-blue-700 dark:text-blue-300">
            {selectedRange.end ? (
              <>
                <span className="font-semibold">Selected Range:</span>{' '}
                {format(selectedRange.start, 'MMM d, yyyy')} - {format(selectedRange.end, 'MMM d, yyyy')}
                <span className="ml-2 text-xs">
                  ({Math.ceil((selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
                </span>
              </>
            ) : (
              <>
                <span className="font-semibold">Start Date:</span>{' '}
                {format(selectedRange.start, 'MMMM d, yyyy')}
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                  Click another date to select end date
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
