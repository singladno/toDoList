import React, { useState, useEffect, createRef, useRef } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Table } from 'reactstrap'
import { Button, ButtonGroup } from 'reactstrap'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io"


var data = []
export function CalendarCell(props) {

    var works = JSON.parse(localStorage.getItem('works'))
    var text
    var style

    works.forEach(work => {
        if (moment(work.date).format('DD-MM-YYYY') === moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY')) {
            text = work.title
            style = work.type
        }
    });
    var cell = moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY');
    return (
        <td className="table-bordered tdMonth">
            <div className="cellMonth">{moment(props.daysArr).add(props.i, 'day').format('D')}</div>
            <div className={`workCell ${cell} ${style}`}>{text}</div>
        </td>
    )
}

export function CalendarMonthWeek(props) {
    const monthWeek = []

    for (let i = 0; i < 7; i++) {
        monthWeek.push(< CalendarCell key={i} i={i} daysArr={props.daysArr} />)
    }
    return (
        <tr>
            {monthWeek}
        </tr>
    )

}

export function CalendarMonthData(props) {
    const monthData = []
    for (let i = 0; i < 5; i++) {
        monthData.push(
            < CalendarMonthWeek key={i} daysArr={props.daysArr[i * 7]} />
        )
    }
    return (
        <tbody>
            {monthData}
        </tbody>
    )
}

export default function MonthData() {
    const daysOfWeek = moment.weekdaysShort()
    const [month, setMonth] = useState(moment().toString())
    const startOfMonth = moment(month).startOf('month').startOf('week').add(1, 'day')
    const daysInMonth = moment(month).daysInMonth()
    const [daysArr, setDaysArr] = useState({})

    useEffect(() => {
        getDaysArr()
    }, [month])

    function getDaysArr() {
        let arr = []
        for (var i = 0; i < daysInMonth; i++) {
            arr.push(moment(startOfMonth).add(i, 'days'))
        }
        setDaysArr(arr)
    }

    data = []
    data.push(
        <div className="calendarMonth container">
            <div className="monthToggle">
                <ButtonGroup>
                    <Button color='link' onClick={() => setMonth(moment(month).subtract(1, 'month'))}><IoIosArrowBack /></Button>
                    <span className="month">{moment(month).format('MMMM YYYY')}</span>
                    <Button color='link' onClick={() => setMonth(moment(month).add(1, 'month'))}><IoIosArrowForward /></Button>
                </ButtonGroup>
            </div>
            <Table className="calendarMonthTable">
                <thead>
                    <tr className="weekDaysMonth">
                        {daysOfWeek.map((day, index) => {
                            if (index > 0) {
                                return (
                                    <th>{day}</th>
                                )
                            }
                        })}
                        <th>{daysOfWeek[0]}</th>
                    </tr>
                </thead>

                < CalendarMonthData daysArr={daysArr} daysInMonth={daysInMonth} />

            </Table>
        </div>
    )
    return data
}