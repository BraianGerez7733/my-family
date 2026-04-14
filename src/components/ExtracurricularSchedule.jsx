import React from 'react';

export default function ExtracurricularSchedule() {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const times = ['16:00', '17:00', '18:00', '19:00'];

  const scheduleData = {
    '16:00': ['Descanso', 'Merienda', 'Descanso', 'Merienda', 'Pileta'],
    '17:00': ['Inglés', 'Libre', 'Gimnasia', 'Libre', 'Pileta'],
    '18:00': ['Libre', 'Gimnasia', 'Libre', 'Inglés', 'Juegos'],
    '19:00': ['Cena', 'Cena', 'Cena', 'Cena', 'Cena']
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Horario Extracurricular</h2>
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
                    <div className={`subject-card ${subject === 'Cena' || subject === 'Descanso' || subject === 'Merienda' ? 'recreo' : ''}`}>
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
