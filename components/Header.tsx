import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react'

/**
 * Props interface for Header component
 */
interface HeaderProps {
  /** Current month being displayed */
  currentMonth: Date
  /** Current dark mode state */
  isDarkMode: boolean
  /** Callback function to toggle dark mode */
  onDarkModeToggle: () => void
  /** Callback function to navigate to previous month */
  onPreviousMonth: () => void
  /** Callback function to navigate to next month */
  onNextMonth: () => void
}

/**
 * Header component - displays calendar title and navigation controls
 * Features month navigation and dark mode toggle with premium interactions
 */
export default function Header({
  currentMonth,
  isDarkMode,
  onDarkModeToggle,
  onPreviousMonth,
  onNextMonth
}: HeaderProps) {
  return (
    <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 transition-colors">
            Interactive Wall Calendar
          </h1>
          <div className="hidden sm:block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium animate-pulse">
            {format(new Date(), 'MMMM yyyy')}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Month Navigation */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 shadow-inner">
            <button
              onClick={onPreviousMonth}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors" />
            </button>
            
            <div className="px-3 py-1 min-w-[120px] text-center">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors">
                {format(currentMonth, 'MMM yyyy')}
              </span>
            </div>
            
            <button
              onClick={onNextMonth}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors" />
            </button>
          </div>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-inner"
            aria-label="Toggle dark mode"
          >
            <div className="relative">
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
