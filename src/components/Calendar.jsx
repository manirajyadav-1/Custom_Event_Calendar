import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import EventModal from './EventModal';
import EventList from './EventList';
import { Toaster } from './ui/toaster';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date)); 
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-10">
        <div className="flex gap-4">
          <div className="flex-1">
            <CalendarHeader 
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid 
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              onEditEvent={handleEditEvent} 
            />
          </div>
          <EventList 
            selectedDate={selectedDate}
            onEditEvent={handleEditEvent}
          />
        </div>
        <EventModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          editEvent={editingEvent}
        />
        <Toaster /> 
      </div>
    </DndProvider>
  );
}

export default Calendar;