import React, { useEffect, useRef, useState, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'reactstrap'
import moment, { locale, locales } from 'moment'

const weekdays = moment.weekdaysShort()
const hours = []
for (var i = 0; i < 24; i++) {
    hours[i] = `${i}:00`
}


// var td = document.querySelector('Mon 1:00')
// console.log(td)
// // td.innerHTML = 'aaa'

export default function Calendar() {

    useEffect(() => {
        let works = JSON.parse(localStorage.getItem('works'))
        console.log(works)
        works.forEach(item => {
            let day = moment(item.date).format("ddd")
            let time = item.time.toString();
            if (time[0] === '0') {
                time = time.slice(1,)
            }
            time = time.substr(0, time.indexOf(':')).concat(":00")
            let el =  document.getElementsByClassName(`${day} ${time}`);
            el[0].innerHTML = item.title
        });
    })

    return (
        <div className="Calendar">
            <Table bordered>
                <thead>
                    <tr className="weekDays">
                        <th>

                        </th>
                            {weekdays.map((day, index) => {
                                if (index > 0) {
                                    return (
                                        <th>{day}</th>
                                    )
                                }
                            })}
                            <th>{weekdays[0]}</th>
                    </tr>
                </thead>

                <tbody>
                {hours.map(hour => {
                    return (
                        <tr>
                            <td>{hour}</td>
                            <td className={`Mon ${hour} cell`}></td>
                            <td className={`Tue ${hour} cell`}></td>
                            <td className={`Wed ${hour} cell`}></td>
                            <td className={`Thu ${hour} cell`}></td>
                            <td className={`Fri ${hour} cell`}></td>
                            <td className={`Sat ${hour} cell`}></td>
                            <td className={`Sun ${hour} cell`}></td>
                        </tr>
                    )
                })}

                </tbody>

            </Table>
        </div>
    )
}