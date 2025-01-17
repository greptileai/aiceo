'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"

export const Calendar = () => {
  const [calendarSrc, setCalendarSrc] = useState('https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York')

  const changeCalendar = (newSrc: string) => {
    setCalendarSrc(newSrc)
  }

  return (
    <div className="w-full h-full">
      <iframe 
        src={calendarSrc}
        style={{border: 0}} 
        width="100%" 
        height="100%"
        title="Interactive Calendar"
      ></iframe>
    </div>
  )
}

