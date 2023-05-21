
import style from "../calendario/Calendario.module.css";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';


export default function Calendario() {
  return (
    <div className={style.calendarContainer}>
      <div className={style.calendarWrapper}>
        <div className={style.calendarHeader}>
          <p className={style.currentDate}>Septiembre 2022</p>
          <div className={style.icons}>
            <span className={style.materialSymbolsRounded}><HiOutlineChevronLeft/></span>
            <span className={style.materialSymbolsRounded}><HiOutlineChevronRight/></span>
          </div>
        </div>
        <div className={style.calendar}>
          <ul className={style.weeks}>
            <li>Dom</li>
            <li>Lun</li>
            <li>Mar</li>
            <li>Mie</li>
            <li>Jue</li>
            <li>Vie</li>
            <li>Sab</li>
          </ul>
          <ul className={style.days}>
            <li className={style.inactive}>28</li>
            <li className={style.inactive}>29</li>
            <li className={style.inactive}>30</li>
            <li className={style.inactive}>31</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li className={style.active}>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
            <li className={style.inactive}>1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
