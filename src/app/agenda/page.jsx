import style from '../page.module.css'
import Appointments from "@/components/appointments/Appointments"
import Calendar from "@/components/calendar/Calendar"

export default function Agenda() {
  return (
    <div className={style.container}>
       <div className={style.centeredContent}>
    <Calendar/>
    <Appointments/>
    </div>
    </div>
  )
}
