'use client'
import React, { useState } from 'react';
import style from '../appointmentCard/AppointmentCard.module.css';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { MdOutlineDone, MdOutlineClose } from "react-icons/md";


export const AppointmentCard = ({ appointmentTimeLocal, appointmentData, handleCardUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customerName, setCustomerName] = useState(appointmentData?.clientName || 'Disponible');
  const [appointmentType, setAppointmentType] = useState(appointmentData?.service || 'Agregar servicio');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedData = {
      ...appointmentData,
      clientName: customerName,
      service: appointmentType,
    };

    handleCardUpdate(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={isEditing ? style.cardEditing : style.card}>
      <div className={style.customerInfo}>
        {isEditing ? (
          <input
            className={style.editableClientNameInput}
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        ) : (
          <div className={style.customerName}>{customerName}</div>
        )}
        <div className={style.appointmentDetails}>
          <div className={style.appointmentTime}>{appointmentTimeLocal}</div>
          {isEditing ? (
            <input
              className={style.editableAppointmentType}
              type="text"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            />
          ) : (
            <div>{appointmentType}</div>
          )}
        </div>
      </div>
      <div className={style.actions}>
        {!isEditing && (
          <HiEllipsisVertical className={style.editIcon} onClick={handleEdit} />
        )}
        {isEditing && (
          <div className={style.buttonsLayout}>
            <MdOutlineClose className={style.editingButton} onClick={handleCancel} />
            <MdOutlineDone className={style.editingButton} onClick={handleSave}/>
          </div>
        )}
      </div>
    </div>
  );
};