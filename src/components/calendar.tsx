'use client'

export const Calendar = () => {

  const calendarSrc = `https://calendar.google.com/calendar/embed?src=ceo%40greptile.com&ctz=America%2FLos_Angeles&mode=DAY`

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