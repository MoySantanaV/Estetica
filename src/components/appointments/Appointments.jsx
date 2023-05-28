'use client'
import { useState } from 'react';
import { AppointmentCard } from "../appointmentCard/AppointmentCard";
import { nanoid } from 'nanoid';


export default function Appointments({ selectedDate, currYear, currMonth }) {
  const [appointmentData, setAppointmentData] = useState([]);
  const currDay = selectedDate?.getDate();
  const currentDate = new Date(Date.UTC(currYear, currMonth, currDay));
  const isWeekday = currentDate.getUTCDay() >= 1 && currentDate.getUTCDay() <= 5;
  const isSaturday = currentDate.getUTCDay() === 6;
  const isSunday = currentDate.getUTCDay() === 0;

  console.log(appointmentData)
  const handleCardUpdate = (updatedData) => {
    const updatedAppointmentData = appointmentData.map((data) => {
      if (data._id === updatedData._id) {
        return {
          ...data,
          clientName: updatedData.clientName,
          service: updatedData.service,
        };
      }
      return data;
    });

    setAppointmentData(updatedAppointmentData);
  };

  const generateAppointments = () => {
    const appointments = [];

    if (isWeekday) {
      generateAppointmentsForRange(appointments, currentDate, 16, 19, 30);
    } else if (isSaturday) {
      generateAppointmentsForRange(appointments, currentDate, 10, 18, 30);
    }

    return appointments;
  };

  const generateAppointmentsForRange = (appointments, currentDate, startHour, endHour, endMinute = 0) => {
    const intervalMinutes = 30;
    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60 + endMinute;

    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');

    const appointmentDate = `${year}-${month}-${day}`;

    for (let minutes = startMinutes; minutes <= endMinutes; minutes += intervalMinutes) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;

      const appointmentTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hour,
        minute
      );

      let appointmentTimeLocal = appointmentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });

      const existingAppointmentData = appointmentData.find(
        data => data.date === appointmentDate && data.time === appointmentTimeLocal
      );

      if (existingAppointmentData) {
        appointments.push(
          <AppointmentCard
            key={existingAppointmentData._id}
            appointmentTimeLocal={appointmentTimeLocal}
            appointmentData={existingAppointmentData}
            handleCardUpdate={handleCardUpdate}
          />
        );
      } else {
        const newAppointmentData = {
          _id: nanoid(5),
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          date: appointmentDate,
          clientName: '',
          service: '',
        };

        appointments.push(
          <AppointmentCard
            key={newAppointmentData._id}
            appointmentTimeLocal={appointmentTimeLocal}
            appointmentData={newAppointmentData}
            handleCardUpdate={handleCardUpdate}
          />
        );

        setAppointmentData(prevData => [...prevData, newAppointmentData]);
      }
    }
  };

  const generatedAppointments = generateAppointments();

  return (
    <div style={{marginBottom: '20px'}}>
      {generatedAppointments.length > 0 ? (
        generatedAppointments
      ) : (
        isSunday && <li>No hay horario disponible para este día.</li>
      )}
    </div>
  );
}