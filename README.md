# Interactive Wall Calendar

A polished, production-quality React (Next.js) component inspired by modern physical wall calendars. Features date range selection, persistent notes, dark mode, and a beautiful paper-like aesthetic.

## Features

### Core Functionality
- **Calendar Grid**: Clean monthly view with correct weekday alignment
- **Date Range Selection**: Click to select start date, click again for end date
- **Smart Selection**: Handles reverse selection and easy reset
- **Notes System**: General monthly notes + date-specific notes
- **Local Storage**: All data persists between sessions
- **Dark Mode**: Complete dark theme support

### UI/UX Features
- **Physical Calendar Aesthetic**: Paper-like design with shadows and textures
- **Hero Images**: Dynamic month-based images
- **Responsive Design**: 
  - Desktop: Side-by-side layout
  - Tablet: Compressed layout
  - Mobile: Stacked layout
- **Smooth Animations**: Month transitions, hover states, selection feedback
- **Weekend Highlighting**: Different colors for Saturday/Sunday
- **Holiday Markers**: Visual indicators for major holidays
- **Today Indicator**: Pulsing dot for current date

### Technical Features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern utility-first styling
- **Component Architecture**: Modular, reusable components
- **React Hooks**: Clean state management
- **Date-fns**: Robust date manipulation

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date utilities
- **lucide-react** - Icons

## Project Structure

```
interactive-wall-calendar/
  app/
    - layout.tsx           # Root layout
    - page.tsx             # Main page
    - globals.css          # Global styles
  components/
    - InteractiveWallCalendar.tsx  # Main component
    - CalendarGrid.tsx     # Calendar grid logic
    - DayCell.tsx          # Individual day cell
    - Header.tsx           # Navigation and controls
    - NotesPanel.tsx       # Notes interface
  package.json
  tailwind.config.js
  tsconfig.json
  next.config.js
  postcss.config.js
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd interactive-wall-calendar
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Date Selection
1. Click any date to select it as the start date
2. Click another date to select it as the end date
3. The range between dates will be highlighted
4. Click the same date again or use "Clear" button to reset

### Notes Management
- **General Notes**: Add monthly thoughts, goals, or reminders
- **Range Notes**: Select a date range first, then add specific notes
- All notes auto-save to localStorage

### Navigation
- Use arrow buttons to navigate between months
- Current month is displayed in the header
- Smooth flip animation during transitions

### Dark Mode
- Click the moon/sun icon to toggle themes
- Preference is saved automatically

## Component Breakdown

### InteractiveWallCalendar
Main container component that manages:
- Overall state (current month, selections, notes)
- localStorage integration
- Component orchestration
- Dark mode handling

### CalendarGrid
Handles calendar display and logic:
- Month grid generation
- Date range calculation
- Holiday integration
- Selection state management

### DayCell
Individual day cell component:
- Hover effects and transitions
- Selection state styling
- Today/weekend indicators
- Holiday tooltips

### NotesPanel
Notes management interface:
- Tab switching (general/range)
- Text editing with auto-save
- Character counting
- Notes summary

### Header
Navigation and controls:
- Month navigation buttons
- Dark mode toggle
- Current month display

## Styling System

### Custom CSS Classes
- `.calendar-card`: Base card styling with shadows
- `.calendar-paper-effect`: Paper-like gradient background
- `.calendar-day`: Base day cell styling
- `.calendar-day.today`: Today's date styling
- `.calendar-day.selected`: Selected date styling
- `.calendar-day.in-range`: Range highlighting
- `.calendar-day.weekend`: Weekend styling

### Color Palette
- **Primary**: Blue tones for selections and interactions
- **Calendar**: Neutral grays with paper textures
- **Weekend**: Warm amber tones
- **Dark Mode**: Adapted colors for night viewing

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts** to connect your GitHub repo

### Other Platforms

#### Netlify
```bash
npm run build
# Upload the .next folder to Netlify
```

#### Railway
```bash
# Connect your GitHub repository to Railway
# Railway will automatically build and deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Customization

### Adding Holidays
Edit `holidays` object in `CalendarGrid.tsx`:
```typescript
const holidays: { [key: string]: string } = {
  '2024-01-01': 'New Year\'s Day',
  '2024-12-25': 'Christmas Day',
  // Add your holidays here
}
```

### Color Themes
Modify `tailwind.config.js` colors:
```javascript
theme: {
  extend: {
    colors: {
      calendar: {
        bg: '#your-color',
        card: '#your-color',
        // ... other colors
      }
    }
  }
}
```

### Image Sources
Change the image URL pattern in `InteractiveWallCalendar.tsx`:
```typescript
src={`https://your-image-source/${format(currentMonth, 'yyyy-MM')}/400/300.jpg`}
```

## Performance Considerations

- **Optimized Images**: Uses Next.js Image optimization
- **Efficient State**: Minimal re-renders with proper React patterns
- **CSS Transitions**: Hardware-accelerated animations
- **LocalStorage**: Efficient data persistence

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use in personal and commercial projects.

## Support

For issues and questions:
- Check the troubleshooting section
- Review component documentation
- Open an issue on GitHub

---

**Built with passion for beautiful, functional UI components**
