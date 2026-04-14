import React from 'react';

export default function ClassSchedule() {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00'];

  const scheduleData = {
    '08:00': ['Matemáticas', 'Lengua', 'Ciencias', 'Inglés', 'Ed. Física'],
    '09:00': ['Lengua', 'Matemáticas', 'Arte', 'Ciencias', 'Inglés'],
    '10:00': ['Recreo', 'Recreo', 'Recreo', 'Recreo', 'Recreo'],
    '11:00': ['Historia', 'Informática', 'Matemáticas', 'Música', 'Lengua'],
    '12:00': ['Geografía', 'Inglés', 'Deportes', 'Arte', 'Salida']
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Horario Escolar</h2>
      </div>
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="time-column-header">Hora</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="time-cell">{time}</td>
                {scheduleData[time].map((subject, index) => (
                  <td key={`${time}-${index}`}>
                    <div className={`subject-card ${subject === 'Recreo' ? 'recreo' : ''}`}>
                      {subject}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
