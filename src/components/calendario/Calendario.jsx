"use client";
import { useState } from "react";
import style from "../calendario/Calendario.module.css";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

export default function Calendario() {
  let date = new Date();
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());


  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDayOfCurrentMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    firstDaysOfNextMonth = new Date(currYear, currMonth, lastDayOfCurrentMonth).getDay(),
    lastDaysOfprevMonth = new Date(currYear, currMonth, 0).getDate();

  const handleLastDays = () => {
    const lastDays = [];
    for (let i = firstDayOfMonth; i > 0; i--) {
      lastDays.push(
        <li key={i} className={style.inactive}>
          {lastDaysOfprevMonth - i + 1}
        </li>
      );
    }
    return lastDays;
  };

  const handleDays = () => {
    const days = [];
    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
      let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? `${style.active}` : "";
      days.push(<li key={i} className={isToday}> {i} </li>);

    }
    return days;
  };

  const handleFirstDaysOfNextMonth = () => {
    const firstDays = [];
    for (let i = firstDaysOfNextMonth; i < 6; i++) {
      firstDays.push(<li key={i} className={style.inactive}> {i - firstDaysOfNextMonth + 1} </li>);
    }
    return firstDays;
  };

  const handleMonths = (e) => {
    const newMonth = e.target.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (newMonth < 0 || newMonth > 11) {
      const newYear = newMonth < 0 ? currYear - 1 : currYear + 1;
      setCurrYear(newYear);
      setCurrMonth(newMonth < 0 ? 11 : 0);
    } else {
      setCurrMonth(newMonth);
    }
  };

  return (
    <>
    <div className={style.calendarContainer}>
      <div className={style.calendarWrapper}>
        <div className={style.calendarHeader}>
          <p
            className={style.currentDate}
          >{`${months[currMonth]} ${currYear}`}</p>
          <div className={style.icons}>
            <span className={style.materialSymbolsRounded}>
              <HiOutlineChevronLeft onClick={handleMonths} id="prev" />
            </span>
            <span className={style.materialSymbolsRounded}>
              <HiOutlineChevronRight onClick={handleMonths} />
            </span>
          </div>
        </div>
        <div className={style.calendar}>
          <ul className={style.weeks}>
            {daysOfWeek.map( (day, index) => (
                <li key={index}>{day}</li>
            ))}
          </ul>
          <ul className={style.days}>
            {handleLastDays()}
            {handleDays()}
            {handleFirstDaysOfNextMonth()}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
