'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight, Sun, Moon, Calendar as CalendarIcon } from 'lucide-react'
import CalendarGrid from './CalendarGrid'
import NotesPanel from './NotesPanel'
import Header from './Header'

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface MonthNotes {
  [key: string]: {
    general: string
    dateSpecific: { [date: string]: string }
  }
}

export default function InteractiveWallCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null })
  const [notes, setNotes] = useState<MonthNotes>({})
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes')
    const savedDarkMode = localStorage.getItem('calendar-dark-mode')
    
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }
    
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes))
  }, [notes])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('calendar-dark-mode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handlePreviousMonth = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonth(subMonths(currentMonth, 1))
      setIsFlipping(false)
    }, 300)
  }

  const handleNextMonth = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonth(addMonths(currentMonth, 1))
      setIsFlipping(false)
    }, 300)
  }

  const handleDateSelect = (date: Date): void => {
    if (!selectedRange.start) {
      // Select start date
      setSelectedRange({ start: date, end: null })
    } else if (!selectedRange.end) {
      // Select end date
      if (date < selectedRange.start) {
        // If selected date is before start date, swap them
        setSelectedRange({ start: date, end: selectedRange.start })
      } else {
        setSelectedRange({ start: selectedRange.start, end: date })
      }
    } else {
      // Reset and select new start date
      setSelectedRange({ start: date, end: null })
    }
  }

  const handleResetSelection = () => {
    setSelectedRange({ start: null, end: null })
  }

  const getMonthKey = (date: Date): string => {
    return format(date, 'yyyy-MM')
  }

  const currentMonthKey = getMonthKey(currentMonth)
  const currentMonthNotes = notes[currentMonthKey] || { general: '', dateSpecific: {} }

  const handleNotesChange = (type: 'general' | 'date', value: string, date?: Date): void => {
    setNotes(prev => {
      const updated = { ...prev }
      if (!updated[currentMonthKey]) {
        updated[currentMonthKey] = { general: '', dateSpecific: {} }
      }
      
      if (type === 'general') {
        updated[currentMonthKey].general = value
      } else if (type === 'date' && date) {
        const dateKey = format(date, 'yyyy-MM-dd')
        updated[currentMonthKey].dateSpecific[dateKey] = value
      }
      
      return updated
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        currentMonth={currentMonth}
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />
      
      <div className={`mt-8 ${isFlipping ? 'flip-animation' : ''}`}>
        {/* Desktop Layout: Side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Calendar Sheet */}
          <div className="lg:col-span-2">
            <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture">
              {/* Spiral Binding */}
              <div className="spiral-binding">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="spiral-hole"
                    style={{ left: `${12.5 + i * 12.5}%` }}
                  />
                ))}
              </div>
              
              {/* Hero Image Section */}
              <div className="curved-transition">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${format(currentMonth, 'yyyy-MM')}/800/400.jpg`}
                    alt={`${format(currentMonth, 'MMMM yyyy')} calendar image`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold drop-shadow-lg">
                      {format(currentMonth, 'MMMM yyyy')}
                    </h3>
                    <p className="text-sm drop-shadow-md opacity-90">
                      A beautiful month for planning and productivity.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="p-6">
                <CalendarGrid
                  currentMonth={currentMonth}
                  selectedRange={selectedRange}
                  onDateSelect={handleDateSelect}
                  onResetSelection={handleResetSelection}
                />
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="lg:col-span-1">
            <NotesPanel
              currentMonth={currentMonth}
              notes={currentMonthNotes}
              selectedRange={selectedRange}
              onNotesChange={handleNotesChange}
            />
          </div>
        </div>

        {/* Tablet Layout: Compressed side-by-side */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
          {/* Main Calendar Sheet */}
          <div className="md:col-span-1">
            <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture">
              {/* Spiral Binding */}
              <div className="spiral-binding">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="spiral-hole"
                    style={{ left: `${16.7 + i * 16.7}%` }}
                  />
                ))}
              </div>
              
              {/* Hero Image Section */}
              <div className="curved-transition">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${format(currentMonth, 'yyyy-MM')}/600/300.jpg`}
                    alt={`${format(currentMonth, 'MMMM yyyy')} calendar image`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-xl font-bold drop-shadow-lg">
                      {format(currentMonth, 'MMMM yyyy')}
                    </h3>
                    <p className="text-xs drop-shadow-md opacity-90">
                      A beautiful month for planning and productivity.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="p-4">
                <CalendarGrid
                  currentMonth={currentMonth}
                  selectedRange={selectedRange}
                  onDateSelect={handleDateSelect}
                  onResetSelection={handleResetSelection}
                />
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="md:col-span-1">
            <NotesPanel
              currentMonth={currentMonth}
              notes={currentMonthNotes}
              selectedRange={selectedRange}
              onNotesChange={handleNotesChange}
            />
          </div>
        </div>

        {/* Mobile Layout: Stacked */}
        <div className="md:hidden space-y-6">
          {/* Hero Image Section */}
          <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture">
            {/* Spiral Binding */}
            <div className="spiral-binding">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="spiral-hole"
                  style={{ left: `${25 + i * 25}%` }}
                />
              ))}
            </div>
            
            <div className="curved-transition">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${format(currentMonth, 'yyyy-MM')}/400/200.jpg`}
                  alt={`${format(currentMonth, 'MMMM yyyy')} calendar image`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg font-bold drop-shadow-lg">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                  <p className="text-xs drop-shadow-md opacity-90">
                    A beautiful month for planning and productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture p-4">
            <CalendarGrid
              currentMonth={currentMonth}
              selectedRange={selectedRange}
              onDateSelect={handleDateSelect}
              onResetSelection={handleResetSelection}
            />
          </div>

          {/* Notes Panel */}
          <NotesPanel
            currentMonth={currentMonth}
            notes={currentMonthNotes}
            selectedRange={selectedRange}
            onNotesChange={handleNotesChange}
          />
        </div>
      </div>
    </div>
  )
}
