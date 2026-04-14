import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import { supabase } from './supabaseClient';
import { format } from 'date-fns';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      // Intenta obtener los eventos asumiendo que la tabla se llama 'events'
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) {
        // Ignoramos el error silenciosamente o mostramos aviso si la tabla no existe aún.
        console.warn("No se pudo cargar de Supabase. Revisa las credenciales o la tabla:", error.message);
        setError("Atención: Supabase no está configurado o conectado correctamente. Usando modo de prueba local.");
      } else if (data) {
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleDayClick = (date, eventsForDay) => {
    setSelectedDay(date);
    setDayEvents(eventsForDay);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setDayEvents([]);
  };

  const handleSaveEvent = async (title) => {
    const formattedDate = format(selectedDay, 'yyyy-MM-dd');
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ title, date: formattedDate }])
        .select();

      if (error) throw error;

      if (data) {
        setEvents([...events, ...data]);
        setDayEvents([...dayEvents, ...data]);
      }
    } catch (err) {
      console.error("Error guardando:", err.message);
      // Fallback local UI behaviour
      const tempEvent = { id: Date.now(), title, date: formattedDate };
      setEvents([...events, tempEvent]);
      setDayEvents([...dayEvents, tempEvent]);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents(events.filter(e => e.id !== id));
      setDayEvents(dayEvents.filter(e => e.id !== id));
    } catch (err) {
      console.error("Error eliminando:", err.message);
      setEvents(events.filter(e => e.id !== id));
      setDayEvents(dayEvents.filter(e => e.id !== id));
    }
  };

  return (
    <>
      <Header />
      
      {error && <div className="warning-banner">{error}</div>}

      <Calendar 
        events={events} 
        onDayClick={handleDayClick} 
      />

      {showModal && (
        <EventModal
          date={selectedDay}
          events={dayEvents}
          onClose={closeModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </>
  );
}

export default App;
