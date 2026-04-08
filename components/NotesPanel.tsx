import { useState } from 'react'
import { format } from 'date-fns'
import { FileText, Calendar, Save, Trash2 } from 'lucide-react'
import { DateRange } from './InteractiveWallCalendar'

interface MonthNotes {
  general: string
  dateSpecific: { [date: string]: string }
}

interface NotesPanelProps {
  currentMonth: Date
  notes: MonthNotes
  selectedRange: DateRange
  onNotesChange: (type: 'general' | 'date', value: string, date?: Date) => void
}

export default function NotesPanel({
  currentMonth,
  notes,
  selectedRange,
  onNotesChange
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'range'>('general')
  const [tempNote, setTempNote] = useState('')
  
  // Get note for selected date range
  const getRangeNote = () => {
    if (!selectedRange.start || !selectedRange.end) return ''
    
    const dateKey = format(selectedRange.start, 'yyyy-MM-dd')
    return notes.dateSpecific[dateKey] || ''
  }
  
  // Handle saving note for selected range
  const handleRangeNoteSave = () => {
    if (selectedRange.start) {
      onNotesChange('date', tempNote, selectedRange.start)
      setTempNote('')
    }
  }
  
  // Handle clearing note for selected range
  const handleRangeNoteClear = () => {
    if (selectedRange.start) {
      onNotesChange('date', '', selectedRange.start)
      setTempNote('')
    }
  }
  
  // Update temp note when selection changes
  const handleTabChange = (tab: 'general' | 'range') => {
    if (tab === 'range') {
      setTempNote(getRangeNote())
    }
    setActiveTab(tab)
  }
  
  return (
    <div className="wall-calendar-sheet rounded-2xl overflow-hidden premium-hover paper-texture h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Notes</span>
          </h2>
          
          {/* Tab switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => handleTabChange('general')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'general'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => handleTabChange('range')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'range'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              disabled={!selectedRange.start}
            >
              Range
            </button>
          </div>
        </div>
      
        {/* General Notes */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Monthly Notes for {format(currentMonth, 'MMMM yyyy')}
              </label>
              <textarea
                value={notes.general}
                onChange={(e) => onNotesChange('general', e.target.value)}
                placeholder="Add your monthly notes, goals, or reminders here..."
                className="w-full h-40 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{notes.general.length} characters</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Auto-saved</span>
              </span>
            </div>
          </div>
        )}
      
        {/* Date Range Notes */}
        {activeTab === 'range' && (
          <div className="space-y-4">
            {selectedRange.start && selectedRange.end ? (
              <>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(selectedRange.start, 'MMM d')} - {format(selectedRange.end, 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Notes for Selected Range
                  </label>
                  <textarea
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="Add notes for this date range..."
                    className="w-full h-32 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRangeNoteSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span className="text-sm">Save Note</span>
                  </button>
                  
                  <button
                    onClick={handleRangeNoteClear}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Clear</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a date range to add specific notes
                </p>
              </div>
            )}
          </div>
        )}
      
        {/* Notes Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <div className="flex justify-between mb-2">
              <span>General notes:</span>
              <span className={notes.general.length > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                {notes.general.length > 0 ? '✓ Added' : 'Empty'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Date-specific notes:</span>
              <span className={Object.keys(notes.dateSpecific).length > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                {Object.keys(notes.dateSpecific).length} saved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
