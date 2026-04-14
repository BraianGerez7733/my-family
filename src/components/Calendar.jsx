import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from 'date-fns';
import { es } from 'date-fns/locale';

export default function Calendar({ events, onDayClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button className="btn-nav" onClick={prevMonth}>&lt; Anterior</button>
        <h2>{format(currentDate, 'MMMM yyyy', { locale: es })}</h2>
        <button className="btn-nav" onClick={nextMonth}>Siguiente &gt;</button>
      </div>
    );
  };

  const renderDaysHeader = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return (
      <div className="days-row">
        {days.map((day, i) => (
          <div className="day-name" key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // Find events for this day
      const dayEvents = events.filter(e => {
          if (!e.date) return false;
          // Compare YYYY-MM-DD
          const eventDateStr = e.date.split('T')[0];
          const currentStr = format(cloneDay, 'yyyy-MM-dd');
          return eventDateStr === currentStr;
      });

      days.push(
        <div
          className={`calendar-day ${!isSameMonth(day, monthStart) ? "empty" : ""} ${
            isSameDay(day, new Date()) ? "is-today" : ""
          }`}
          key={day}
          onClick={() => {
            if (isSameMonth(cloneDay, monthStart)) {
              onDayClick(cloneDay, dayEvents);
            }
          }}
        >
          {isSameMonth(day, monthStart) ? (
            <>
              <span className="day-number">{formattedDate}</span>
              <div className="events-container">
                {dayEvents.map(ev => (
                  <div className="event-indicator" key={ev.id} title={ev.title}>
                    {ev.title}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="calendar-grid">{days}</div>;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDaysHeader()}
      {renderCells()}
    </div>
  );
}
