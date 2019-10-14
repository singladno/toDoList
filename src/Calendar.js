import React, { useEffect, useRef, useState, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'reactstrap'
import moment, { locale, locales } from 'moment'
import { Button } from 'reactstrap'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const weekdays = moment.weekdaysShort()
const hours = []
for (var i = 0; i < 24; i++) {
    hours[i] = `${i}:00`
}


// var td = document.querySelector('Mon 1:00')
// console.log(td)
// // td.innerHTML = 'aaa'

export default function Calendar() {
    const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week').add(1, 'days').format('DD'))
    

    function toggleWeekBack() {
        setStartOfWeek(startOfWeek => {
          return moment(startOfWeek, "DD").subtract(1, 'week').format("DD")
        })
    }
    
    function toggleWeekForward() {
        setStartOfWeek(startOfWeek => {
            return moment(startOfWeek, "DD").add(1, 'week').format("DD")
          })
    }

    useEffect(() => {
        const today = moment().format("ddd")
        let works = JSON.parse(localStorage.getItem('works'))
        works.forEach(item => {
            let day = moment(item.date).format("ddd")
            let time = item.time.toString();
            if (time[0] === '0') {
                time = time.slice(1,)
            }
            time = time.substr(0, time.indexOf(':')).concat(":00")
            let el =  document.getElementsByClassName(`${day} ${time}`);
            el[0].innerHTML = item.title
            let thDay = document.querySelector(`th.${today}`)
            thDay.classList.add("current")
        });
    })

    return (
        <div className="Calendar">
            <div className="toggleWeek">
                <Button onClick={toggleWeekBack} style={{marginRight:'10px'}}color="link" size="lg"><IoIosArrowBack/></Button>
                <Button onClick={toggleWeekForward} color="link" size="lg"><IoIosArrowForward/></Button>
            </div>
            <Table bordered>
                <thead>
                    <tr className="weekDays">
                        <th>

                        </th>
                            {weekdays.map((day, index) => {
                                if (index > 0) {
                                    return (
                                        <th className={day}>{`${day}, `} <span className="num">{`${moment(startOfWeek, "DD").add(index - 1, "day").format("DD")}`}</span></th>
                                    )
                                }
                            })}
                            <th>{`${weekdays[0]}, ${moment(startOfWeek, "DD").add(6, "days").format("DD")}`}</th>
                    </tr>
                </thead>

                <tbody>
                {hours.map(hour => {
                    return (
                        <tr>
                            <td>{hour}</td>
                            <td className={`Mon ${moment(startOfWeek, "DD").format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Tue ${moment(startOfWeek, "DD").add(1, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Wed ${moment(startOfWeek, "DD").add(2, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Thu ${moment(startOfWeek, "DD").add(3, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Fri ${moment(startOfWeek, "DD").add(4, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Sat ${moment(startOfWeek, "DD").add(5, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                            <td className={`Sun ${moment(startOfWeek, "DD").add(6, 'days').format("DD MM YYYY")} ${hour} cell`}></td>
                        </tr>
                    )
                })}

                </tbody>

            </Table>
        </div>
    )
}