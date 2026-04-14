import React, { useState } from 'react';

export default function EventModal({ date, events, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title);
    setTitle('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Eventos del {date.toLocaleDateString()}</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        
        <form className="event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Añadir nuevo evento..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-submit">Guardar Evento</button>
        </form>

        {events && events.length > 0 && (
          <div className="event-list">
            <h4>Eventos guardados:</h4>
            {events.map((ev) => (
              <div key={ev.id} className="event-item">
                <span>{ev.title}</span>
                <button className="btn-delete" onClick={() => onDelete(ev.id)}>
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
